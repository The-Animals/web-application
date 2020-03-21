using System;
using System.Data.Common;

namespace PALS.Models
{
    public class Summary
    {
        public Summary(DbDataReader reader) { 
            Text = reader["Sentence"] as string ?? default(string);
            MLAId = reader["MLAId"] as int? ?? -1;
            MLARank = reader["MLARank"] as int? ?? -1;
            PartyRank = reader["PartyRank"] as int? ?? -1;
            DocumentDate = reader["Date"] as DateTime? ?? default(DateTime);
            DocumentUrl = reader["Url"] as string ?? default(string);
        }

        public string Text { get; set; }

        public int MLAId { get; set; }

        public int MLARank { get; set; }

        public int PartyRank { get; set; }

        public DateTime DocumentDate { get; set; }

        public string DocumentUrl { get; set; }
    }
}
