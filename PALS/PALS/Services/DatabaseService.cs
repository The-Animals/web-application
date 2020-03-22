using MySql.Data.MySqlClient;
using Renci.SshNet;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using PALS.Models;
using System.Data.Common;

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

        // Set the connection, command, and then execute the command with query and return the reader.  
        public async Task<DbDataReader> ExecuteAsync(String commandText,
            MySqlParameter[] parameters = null, CommandType commandType = CommandType.Text)
        {

            using (MySqlCommand cmd = new MySqlCommand(commandText, this.connection))
            {
                cmd.CommandType = commandType;

                if (parameters != null) cmd.Parameters.AddRange(parameters);

                this.connection.Open();
                // When using CommandBehavior.CloseConnection, the connection will be closed when the   
                // IDataReader is closed.  
                return await cmd.ExecuteReaderAsync(CommandBehavior.CloseConnection);
            }
        }

        /**
		 * Gets MLA meta-data and summaries.
		 */
        public async Task<MLA> GetMLA(int ridingNumber)
        {
            var sql = @"SELECT *
					  FROM db.mlas 
					  WHERE RidingNumber = @RidingNumber 
					  LIMIT 1";

            MySqlParameter[] parameters = { new MySqlParameter("@RidingNumber", ridingNumber) };

            using (var dataReader = await this.ExecuteAsync(sql, parameters))
            {
                if (dataReader.Read())
                {
                    return new MLA(dataReader);
                }
            }
            throw new DataException("No data returned");
        }

        public async Task<List<MLA>> GetAllMLAs()
        {
            var mlas = new List<MLA>();
            var sql = @"SELECT *
					  FROM db.mlas";

            using (var dataReader = await this.ExecuteAsync(sql))
            {
                while (dataReader.Read())
                {
                    mlas.Add(new MLA(dataReader));
                }
                return mlas;
            }
        }

        public async Task<List<Summary>> GetMLASummaries(int mlaId, int n)
        {
            var summaries = new List<Summary>();

            var sql = @"SELECT *
					  FROM db.summaries_@MLA_Id
					  LIMIT @N";

            MySqlParameter[] parameters = {
                new MySqlParameter("@MLA_Id", mlaId),
                new MySqlParameter("@N", n)
            };

            using (var dataReader = await this.ExecuteAsync(sql, parameters))
            {
                while (dataReader.Read())
                {
                    summaries.Add(new Summary(dataReader));
                }
            }
            return summaries;
        }

        public async Task<List<Summary>> GetAllSummaries(int n)
        {
            var summaries = new List<Summary>();

            var sql = @"SELECT *
						FROM db.all_summaries
						LIMIT @N";

            MySqlParameter[] parameters = {
                new MySqlParameter("@N", n)
            };

            using (var dataReader = await this.ExecuteAsync(sql, parameters))
            {
                while (dataReader.Read())
                {
                    summaries.Add(new Summary(dataReader));
                }
            }
            return summaries;
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
