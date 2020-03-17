using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

using PALS.Services;
using PALS.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace PALS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MLASummaryController : ControllerBase
    {
        private DatabaseService databaseService;

        public MLASummaryController()
        {
            databaseService = new DatabaseService();
        }

        [Route("~/api/GetSummary")]
        [HttpGet]
        public List<Summary> Summary(int RidingID)
        {            
            return databaseService.GetSummaries(RidingID);
        }

        // TODO: Implemented parsing a JSON get object instead of multiple parameters.
        [Route("~/api/GetSummaryWithFilter")]
        [HttpGet]
        public string GetSummaryWithFilter(string Query, int? RidingNumber, 
                                           string StartDate, string EndDate)
        {

            //dynamic searchFilter = JObject.Parse(inputFilter);

            var filter = new Filter
            {
                  Query = Query,            
                  RidingNumber = RidingNumber != 0 ? RidingNumber : null,            
            //    Caucus = searchFilter.caucus,
                  StartDate = DateTime.Parse(StartDate),
                  EndDate = DateTime.Parse(EndDate)
            };

            var result = databaseService.GetSummariesWithFilter(filter);                        
            return JsonConvert.SerializeObject(result);
        }
    }
}
