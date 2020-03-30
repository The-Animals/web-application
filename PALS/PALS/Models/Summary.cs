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
            Caucus = reader["Caucus"] as string ?? default(string);
            
            if (DateTime.TryParse((string)reader["Date"], out var parsedDate))
            {
                DocumentDate = parsedDate;
            } 
            else
            {
                DocumentDate = default(DateTime);
            }                  
            
            DocumentUrl = reader["Url"] as string ?? default(string);

            string firstname = reader["FirstName"] as string ?? default(string);
            string lastname = reader["LastName"] as string ?? default(string);
            Name = $"{firstname} {lastname}";

        }

        public string Text { get; set; }

        public int MLAId { get; set; }

        public int MLARank { get; set; }

        public int PartyRank { get; set; }

        public string Caucus { get; set; }

        public string Name { get; set; }

        public DateTime DocumentDate { get; set; }

        public string DocumentUrl { get; set; }
    }
}
