﻿using System.Collections.Generic;
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

        [Route("{mlaId}/{n?}")]
        [HttpGet]
        public async Task<List<Summary>> GetSummariesMLA(int mlaId, int n = 1000)
        {            
            return await databaseService.GetMLASummaries(mlaId, n);
        }

        [Route("all/{n?}/{offset?}")]
        [HttpGet]
        public async Task<List<Summary>> GetAllSummaries(int n = 10000, int offset = 0) 
        {
            return await databaseService.GetAllSummaries(n, offset);
        }

        [Route("participation/{mlaId}")]
        [HttpGet]
        public async Task<List<Participation>> GetParticipationTimeSeries(int mlaId) {
            return await databaseService.GetParticipationData(mlaId);
        }
    }
}
