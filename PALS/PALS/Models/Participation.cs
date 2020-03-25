using System;
using System.Data.Common; 

namespace PALS.Models
{
    public class Participation
    {
        public Participation(DbDataReader reader) 
        { 
            if (DateTime.TryParse((string)reader["Date"], out var parsedDate))
            {
                DocumentDate = parsedDate;
            } 
            else
            {
                DocumentDate = default(DateTime);
            }
            
            Quantity = reader["Quantity"] as int? ?? 0; 
        }

        public DateTime DocumentDate { get; set; }

        public int Quantity { get; set; }
    }
}