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
		private MySQLConfig mySQLConfig;
		private SSHConfig sSHConfig;

		// Injectable dependancies
		private ConfigService configService;

		public DatabaseService(ConfigService configService = null)
		{
			configService ??= new ConfigService();

			mySQLConfig = configService.GetMySQLConfig();
			sSHConfig = configService.GetSSHConfig();

			
			var databaseUserName = "admin";
			var databasePassword = "TheAnimals2020!";

			var (sshClient, localPort) = ConnectSsh(sSHConfig.Host, 
													sSHConfig.User, 
													sshKeyFile: sSHConfig.PrivateKey);
			using (sshClient)
			{
				MySqlConnectionStringBuilder csb = new MySqlConnectionStringBuilder
				{
					Server = "127.0.0.1",
					Port = localPort,
					UserID = databaseUserName,
					Password = databasePassword,
				};

				using (var connection = new MySqlConnection(csb.ConnectionString))
				{
					connection.Open();

					string SQL = "SELECT * FROM db.mlas LIMIT 1";

					MySqlCommand cmd = new MySqlCommand(SQL, connection);
					MySqlDataReader dataReader = cmd.ExecuteReader();
					if (dataReader.Read())
					{
						var test1 = (int)dataReader["RidingNumber"];
					    var test2 = (string)dataReader["FirstName"];
						
					}

					dataReader.Close();
					connection.Close();
				}
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
