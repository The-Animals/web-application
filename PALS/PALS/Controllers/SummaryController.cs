using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using PALS.Services;
using PALS.Models;

namespace PALS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SummaryController : ControllerBase
    {
        private DatabaseService databaseService;

        public SummaryController()
        {
            databaseService = new DatabaseService();
        }

        [Route("mla/{mlaId}/{n?}")]
        [HttpGet]
        public async Task<List<Summary>> GetSummariesMLA(int mlaId, int n = 500)
        {            
            return await databaseService.GetMLASummaries(mlaId, n);
        }

        [Route("caucus/{caucus}/{n?}")]
        [HttpGet]
        public async Task<List<Summary>> GetSummariesCaucus(int caucus, int n = 1000) 
        {
            return await databaseService.GetCaucusSummaries(caucus, n);
        }
    }
}
