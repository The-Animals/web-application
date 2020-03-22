using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PALS.Models;

using PALS.Services;

namespace PALS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MLAController : ControllerBase
    {
        private DatabaseService databaseService;

        public MLAController()
        {
            databaseService = new DatabaseService();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<MLA> GetMLA(int id)
        {            
            return await databaseService.GetMLA(id);
        }

        [HttpGet]
        [Route("all")]
        public async Task<List<MLA>> GetAllMLAs()
        {
            return await databaseService.GetAllMLAs();
        }

    }
}