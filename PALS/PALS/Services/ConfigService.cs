using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PALS.Models;

using IniParser;
using IniParser.Model;

namespace PALS.Services
{    
    public class ConfigService
    {
        private IniData data;

        public ConfigService()
        {
            var parser = new FileIniDataParser();
            data = parser.ReadFile("config.ini");
        }

        public MySQLConfig GetMySQLConfig()
        {
            var mySQLConfig = new MySQLConfig();            

            mySQLConfig.Host = data["mysql"]["host"];
            mySQLConfig.Port = int.Parse(data["mysql"]["port"]);
            mySQLConfig.User = data["mysql"]["user"];
            mySQLConfig.Password = data["mysql"]["password"];
            mySQLConfig.Database = data["mysql"]["db"];
            return mySQLConfig;
        }

        public SSHConfig GetSSHConfig()
        {
            var sshConfig = new SSHConfig();

            sshConfig.Host = data["ssh"]["host"];
            sshConfig.Port = int.Parse(data["ssh"]["port"]);
            sshConfig.User = data["ssh"]["user"];
            sshConfig.PrivateKey = data["ssh"]["pkey"];
            return sshConfig;
        }

        public MinioConfig GetMinioConfig()
        {
            var minioConfig = new MinioConfig();

            minioConfig.Url = data["minio"]["url"];
            minioConfig.AccessKey = data["minio"]["access_key"];
            minioConfig.SecretKey = data["minio"]["secret_key"];

            return minioConfig;
        }
    }
}
