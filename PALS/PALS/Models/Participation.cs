using System;
using System.Data.Common; 

namespace PALS.Models
{
    public class Participation
    {
        public Participation(DbDataReader reader) 
        { 
            Quantity = Convert.ToInt32(reader["Quantity"]) as int? ?? default(int);
            if (DateTime.TryParse((string)reader["Date"], out var parsedDate))
            {
                DocumentDate = parsedDate;
            } 
            else
            {
                DocumentDate = default(DateTime);
            }
        }

        public DateTime DocumentDate { get; set; }

        public int Quantity { get; set; }
    }
}