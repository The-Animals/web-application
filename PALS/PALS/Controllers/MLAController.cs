using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using PALS.Services;

namespace PALS.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MLAController : ControllerBase
    {
        // MLAs correspond to the riding IDs on the ShapeFile.
        // TODO: Grab this data from a DB.
        private Dictionary<int, MLA> MLAs = new Dictionary<int, MLA>()
        {
            { 49, new MLA { Name = "Carson, Member Jon ",
                            Riding = "Edmonton-West Henday",
                            ConstituencyPhone = "780.415.1800",
                            LegislaturePhone = "780.414.0711",
                            Email = "Edmonton.WestHenday@assembly.ab.ca",
                            Party = "NDP"} }
        };

        [HttpGet]
        public MLA Get(int RidingID)
        {
            var databaseService = new DatabaseService();
            var mla = databaseService.GetMLA(RidingID);

            return mla;
        }
    }
}