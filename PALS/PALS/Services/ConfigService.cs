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

        FileIniDataParser parser;

        public ConfigService()
        {
            parser = new FileIniDataParser();
        }

        public MySQLConfig GetMySQLConfig()
        {
            var mySQLConfig = new MySQLConfig();
            IniData data = parser.ReadFile("config.ini");

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
            IniData data = parser.ReadFile("config.ini");

            sshConfig.Host = data["ssh"]["host"];
            sshConfig.Port = int.Parse(data["ssh"]["port"]);
            sshConfig.User = data["ssh"]["user"];
            sshConfig.PrivateKey = data["ssh"]["pkey"];
            return sshConfig;
        }
    }
}
