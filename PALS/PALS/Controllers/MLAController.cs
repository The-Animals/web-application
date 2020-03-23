using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PALS.Models;

using PALS.Services;

namespace PALS.Controllers
{
    // Means anything here is called by prepending "api/mla"
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
            var allMLAs = await databaseService.GetAllMLAs();
            allMLAs.Insert(0, new MLA
            {
                Name = "ALL",
                Riding = "ALL"
            });
            return allMLAs;
        }

    }
}
