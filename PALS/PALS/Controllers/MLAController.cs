using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PALS.Models;

using PALS.Services;

/**
 * **SRS_REFERENCE**
 * 
 * Endpoint for retrieving MLA meta-data.
 * 
 * View individual MLA's metadata and summaries: (REQ15),
 * 
 */

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
        [Route("all")]
        public async Task<List<MLA>> GetAllMLAs()
        {
            return await databaseService.GetAllMLAs();
        }
    }
}
