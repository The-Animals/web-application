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
    public class MLAController : ControllerBase
    {
        private DatabaseService databaseService;

        public MLAController()
        {
            databaseService = new DatabaseService();
        }

        [Route("~/api/GetMLA")]
        [HttpGet]
        public async Task<MLA> MLA(int RidingID)
        {            
            var mla = databaseService.GetMLA(RidingID);

            var minioService = new MinioService();
            await minioService.Run("images", "Tyler_Shandro.jpg");

            return mla;
        }

        [Route("~/api/GetAllMLAs")]
        [HttpGet]
        public List<MLA> GetAllMLAs()
        {
            return databaseService.GetAllMLAs();
        }

    }
}