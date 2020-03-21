using System;
using System.Collections.Generic;

namespace PALS
{
    public class Parties
    {
        public static string NDP = "NDP";
        public static string UCP = "UCP";
        public static string AB = "AB";        

        private static List<string> ALL_PARTIES = 
            new List<string> { NDP, UCP, AB };

        public static bool IsValidParty(string party)
        {
            return ALL_PARTIES.Contains(party);
        }
    }

    public class MLA
    {
        public string Name { get; set; }

        public string Riding { get; set; }

        public int RidingNumber { get; set; }

        public string ConstituencyPhone { get; set; }

        public string LegislaturePhone { get; set; }

        public string Email { get; set; }

        public string Party { get; set; }

    }
}
