using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PALS.Models
{
    public class SSHConfig
    {
        public string Host { get; set; }

        public int Port { get; set; }

        public string User { get; set; }

        public string PrivateKey { get; set; }

    }
}
