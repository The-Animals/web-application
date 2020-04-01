using System.Collections.Generic;
using System.Data.Common;

namespace PALS.Models
{
    public class MLA
    {
        public MLA(DbDataReader reader) {
            Id = reader["Id"] as int? ?? -1;
            string firstname = reader["FirstName"] as string ?? default(string);
            string lastname = reader["LastName"] as string ?? default(string);
            Name = $"{firstname} {lastname}";
            Riding = reader["RidingName"] as  string ?? default(string);
            RidingNumber = reader["RidingNumber"] as int? ?? -1;
            ConstituencyPhone = reader["RidingPhoneNumber"] as string ?? default(string);
            LegislaturePhone = reader["LegislativePhoneNumber"] as string ?? default(string);
            Email = reader["Email"] as string ?? default(string);
            Party = reader["Caucus"] as string ?? default(string);
            Similar = reader["MostSimilar"] as int? ?? -1;
            Different = reader["LeastSimilar"] as int? ?? -1;
        }

        public MLA() { }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Riding { get; set; }

        public int RidingNumber { get; set; }

        public string ConstituencyPhone { get; set; }

        public string LegislaturePhone { get; set; }

        public string Email { get; set; }

        public string Party { get; set; }

        public int Similar { get; set; }

        public int Different { get; set; }
    }
}
