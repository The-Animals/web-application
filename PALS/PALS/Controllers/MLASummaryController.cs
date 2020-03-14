using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using PALS.Services;
using PALS.Models;

namespace PALS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MLASummaryController : ControllerBase
    {

        [Route("~/api/GetSummary")]
        [HttpGet]
        public List<Summary> Summary(int RidingID)
        {
            var databaseService = new DatabaseService();
            return databaseService.GetSummaries(RidingID);
        }
    }
}
