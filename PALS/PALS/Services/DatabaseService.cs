using MySql.Data.MySqlClient;
using Renci.SshNet;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Sockets;
using System.Reflection;
using System.Threading.Tasks;

using PALS.Models;

namespace PALS.Services
{
    public class DatabaseService
    {
		private MySqlConnection connection;
		private SshClient sshClient;

		private uint localPort;

		private MySQLConfig mySQLConfig;
		private SSHConfig sSHConfig;

		// Injectable dependancies
		private ConfigService configService;

		public DatabaseService(ConfigService configService = null)
		{
			configService ??= new ConfigService();

			mySQLConfig = configService.GetMySQLConfig();
			sSHConfig = configService.GetSSHConfig();

			(sshClient, localPort) = ConnectSsh(sSHConfig.Host,
												sSHConfig.User,
												sshKeyFile: sSHConfig.PrivateKey);

			MySqlConnectionStringBuilder csb = new MySqlConnectionStringBuilder
			{
				Server = mySQLConfig.Host,
				Port = localPort,
				UserID = mySQLConfig.User,
				Password = mySQLConfig.Password,
			};

			this.connection = new MySqlConnection(csb.ConnectionString);

		}

		/**
		 * Gets MLA meta-data and summaries.
		 */
		public MLA GetMLA(int ridingNumber)
		{
			MLA mla = null;
			var SQL = "SELECT * " +
					  "FROM db.mlas " +
					  "WHERE RidingNumber = @ridingNumber " +
					  "LIMIT 1";

			using (sshClient)
			{
				this.connection.Open();

				var cmd = new MySqlCommand(SQL, connection);
				cmd.Parameters.AddWithValue("@ridingNumber", ridingNumber);

				var dataReader = cmd.ExecuteReader();
				if (dataReader.Read())
				{
					mla = new MLA();
					mla.Name = (string)dataReader["FirstName"] + " " +
							   (string)dataReader["LastName"];
					mla.Riding = (string)dataReader["RidingName"];
					mla.ConstituencyPhone = (string)dataReader["RidingPhoneNumber"];
					mla.LegislaturePhone = (string)dataReader["LegislativePhoneNumber"];
					mla.Email = (string)dataReader["Email"];
					mla.Party = (string)dataReader["Caucus"];

				}
				dataReader.Close();				

				this.connection.Close();
			}

			return mla;

		}

		public List<MLA> GetAllMLAs()
		{
			var mlas = new List<MLA>();
			var SQL = "SELECT * " +
					  "FROM db.mlas ";

			using (sshClient)
			{
				this.connection.Open();

				var cmd = new MySqlCommand(SQL, connection);				

				var dataReader = cmd.ExecuteReader();
				while (dataReader.Read())
				{
					var mla = new MLA();
					mla.Name = FromDBVal<string>(dataReader["FirstName"])
								+ " " +
							   FromDBVal<string>(dataReader["LastName"]);

					mla.Riding = FromDBVal<string>(dataReader["RidingName"]);
					mla.RidingNumber = FromDBVal<int>(dataReader["RidingNumber"]);
					mla.ConstituencyPhone = FromDBVal<string>(dataReader["RidingPhoneNumber"]);
					mla.LegislaturePhone = FromDBVal<string>(dataReader["LegislativePhoneNumber"]);
					mla.Email = FromDBVal<string>(dataReader["Email"]);
					mla.Party = FromDBVal<string>(dataReader["Caucus"]);

					mlas.Add(mla);
				}
									
				dataReader.Close();
				this.connection.Close();
			}

			return mlas;
		}

		public List<Summary> GetSummaries(int ridingNumber)
		{
			var summaries = new List<Summary>();

			var SQL = "SELECT Sentence " +
					  "FROM db.summaries_@ridingNumber " +
					  "LIMIT 10";

			using (sshClient)
			{
				this.connection.Open();

				var cmd = new MySqlCommand(SQL, connection);
				cmd.Parameters.AddWithValue("@ridingNumber", ridingNumber);
				var dataReader = cmd.ExecuteReader();

				var i = 1;
				while (dataReader.Read())
				{
					summaries.Add(new Summary
					{
						Text = (string)dataReader["Sentence"],
						SummaryRank = i
					});
					++i;
				}

				dataReader.Close();
				this.connection.Close();
			}

			return summaries;
		}

		public Dictionary<int, List<Summary>> GetSummariesWithFilter(Filter filter)
		{
			var summaries = new Dictionary<int, List<Summary>>();
			var STORED_PROC = "db.search_with_filter";

			using (sshClient)
			{
				this.connection.Open();
				
				MySqlCommand cmd = new MySqlCommand(STORED_PROC, connection);
				cmd.CommandType = CommandType.StoredProcedure;
				
				cmd.Parameters.AddWithValue("@query", filter.Query);
				cmd.Parameters.AddWithValue("@ridingNumber", filter.RidingNumber);
				var dataReader = cmd.ExecuteReader();

				var i = 1;
				var listOfSentences = new List<Summary>();
				while (dataReader.Read())
				{
					var ridingNumber = (int)dataReader["RidingNumber"];
					var summary = new Summary
					{
						Text = (string)dataReader["Sentence"],
						SummaryRank = (int)dataReader["MLARank"]
					};

					if (summaries.ContainsKey(ridingNumber))
					{
						summaries[ridingNumber].Add(summary);
					} 
					else
					{
						summaries[ridingNumber] = new List<Summary>() { summary };
					}


				}

				dataReader.Close();
				this.connection.Close();
			}

			return summaries;
		}

		public static T FromDBVal<T>(object obj)
		{
			if (obj == null || obj == DBNull.Value)
			{
				return default(T); // returns the default value for the type
			}
			else
			{
				return (T)obj;
			}
		}

		/**
		 * Setup a SSH tunnel.
		 * Credit to: https://mysqlconnector.net/tutorials/connect-ssh/
		 */
		public static (SshClient SshClient, uint Port) ConnectSsh
			(string sshHostName, string sshUserName, string sshPassword = null,
			 string sshKeyFile = null, string sshPassPhrase = null, int sshPort = 22,
			 string databaseServer = "localhost", int databasePort = 5000)
		{
			// check arguments
			if (string.IsNullOrEmpty(sshHostName))
				throw new ArgumentException($"{nameof(sshHostName)} must be specified.", nameof(sshHostName));
			if (string.IsNullOrEmpty(sshHostName))
				throw new ArgumentException($"{nameof(sshUserName)} must be specified.", nameof(sshUserName));
			if (string.IsNullOrEmpty(sshPassword) && string.IsNullOrEmpty(sshKeyFile))
				throw new ArgumentException($"One of {nameof(sshPassword)} and {nameof(sshKeyFile)} must be specified.");
			if (string.IsNullOrEmpty(databaseServer))
				throw new ArgumentException($"{nameof(databaseServer)} must be specified.", nameof(databaseServer));

			// define the authentication methods to use (in order)
			var authenticationMethods = new List<AuthenticationMethod>();
			if (!string.IsNullOrEmpty(sshKeyFile))
			{
				authenticationMethods.Add(new PrivateKeyAuthenticationMethod(sshUserName,
					new PrivateKeyFile(sshKeyFile, string.IsNullOrEmpty(sshPassPhrase) ? null : sshPassPhrase)));
			}

			if (!string.IsNullOrEmpty(sshPassword))
			{
				authenticationMethods.Add(new PasswordAuthenticationMethod(sshUserName, sshPassword));
			}

			// connect to the SSH server
			var sshClient = new SshClient(new ConnectionInfo(sshHostName, sshPort, sshUserName, authenticationMethods.ToArray()));
			sshClient.Connect();

			// forward a local port to the database server and port, using the SSH server
			var forwardedPort = new ForwardedPortLocal("127.0.0.1", databaseServer, (uint)databasePort);
			sshClient.AddForwardedPort(forwardedPort);
			forwardedPort.Start();

			return (sshClient, forwardedPort.BoundPort);
		}
	}

}
