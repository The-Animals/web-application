using System; 
using System.Collections.Generic;
using Xunit;
using PALS.Controllers;
using PALS.Models;

namespace PALS.Tests
{
    public class ApiTests
    {
        [Fact]
        public async void Test_GetAllMLAs()
        {
            MLAController mlaController = new MLAController();
            List<MLA> mlas = await mlaController.GetAllMLAs(); 
            Assert.True(mlas.Count == 87);
        }

        [Fact]
        public async void Test_GetSumarriesForMLAId57()
        {
            SummaryController summaryController = new SummaryController(); 
            List<Summary> summaries = await summaryController.GetSummariesMLA(57);
            Assert.True(summaries.Count == 1000);
        }

        [Fact]
        public async void Test_Get10SumarriesForMLAId57()
        {
            SummaryController summaryController = new SummaryController(); 
            List<Summary> summaries = await summaryController.GetSummariesMLA(57, 10);
            Assert.True(summaries.Count == 10);
        }

        [Fact]
        public async void Test_GetParticipationForMLA57() 
        {
            SummaryController summaryController = new SummaryController(); 
            List<Participation> participation = await summaryController.GetParticipationTimeSeries(57); 
            int count = 0; 
            foreach (var p in participation)
            {
                count += p.Quantity;
            }
            Assert.True(count == 1000);
        }

        [Fact]
        public async void Test_GetAllSummaries()
        {
            SummaryController summaryController = new SummaryController(); 
            List<Summary> summaries = await summaryController.GetAllSummaries();
            Assert.True(summaries.Count == 10000);
        } 

        
        [Fact]
        public async void Test_Get1000FromAllSummaries()
        {
            SummaryController summaryController = new SummaryController(); 
            List<Summary> summaries = await summaryController.GetAllSummaries(1000);
            Assert.True(summaries.Count == 1000);
        }

        [Fact]
        public async void Test_Get1000FromAllSummariesOffset1()
        {
            SummaryController summaryController = new SummaryController(); 
            List<Summary> summaries = await summaryController.GetAllSummaries(1000, 1);
            Assert.True(summaries.Count == 1000);
        }

        [Fact]
        public async void Test_AllSummaryOffsetUniqueness()
        {
            SummaryController summaryController = new SummaryController(); 
            List<Summary> summaries0 = await summaryController.GetAllSummaries(1000, 0);
            List<Summary> summaries1 = await summaryController.GetAllSummaries(1000, 1);
            HashSet<Summary> hashSummaries0 = new HashSet<Summary>(summaries0);
            HashSet<Summary> hashSummaries1 = new HashSet<Summary>(summaries1);
            Assert.True(hashSummaries0.Count == 1000);
            Assert.True(hashSummaries1.Count == 1000);
            hashSummaries0.ExceptWith(hashSummaries1);
            Assert.True(hashSummaries0.Count == 1000);
        }
    }
}
