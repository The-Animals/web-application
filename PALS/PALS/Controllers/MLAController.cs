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

        [Route("~/api/GetMLA")]
        [HttpGet]
        public async Task<MLA> MLA(int RidingID)
        {
            var databaseService = new DatabaseService();
            var mla = databaseService.GetMLA(RidingID);

            var minioService = new MinioService();
            await minioService.Run("images", "Tyler_Shandro.jpg");

            return mla;
        }

    }
}