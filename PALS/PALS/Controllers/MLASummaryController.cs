using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using PALS.Services;

namespace PALS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MLASummaryController : ControllerBase
    {

        [HttpGet]
        public List<string> Summary(int RidingID)
        {
            var databaseService = new DatabaseService();
            return databaseService.GetSummaries(RidingID);
        }
    }
}