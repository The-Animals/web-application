using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PALS.Models
{
    public class Filter
    {
        public string Query { get; set; }

        public int MLAId { get; set; }

        public string Caucus { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int RidingNumber { get; set; }

        public string Riding { get; set; }

    }
}
