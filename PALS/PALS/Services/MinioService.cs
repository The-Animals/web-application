using System;
using System.Threading.Tasks;

using Minio;
using PALS.Models;
using Minio.DataModel;

namespace PALS.Services
{
    public class MinioService
    {

		// Injectable dependancies
		private ConfigService configService;
        private MinioConfig minioConfig;

		private MinioClient minio;

		public MinioService(ConfigService configService = null)
		{
			configService ??= new ConfigService();
            minioConfig = configService.GetMinioConfig();

			minio = new MinioClient(minioConfig.Url, 
                                    minioConfig.AccessKey, 
                                    minioConfig.SecretKey);

			// Create an async task for listing buckets.
			var getListBucketsTask = minio.ListBucketsAsync();

			// Iterate over the list of buckets.
			foreach (Bucket bucket in getListBucketsTask.Result.Buckets)
			{
				Console.WriteLine(bucket.Name + " " + bucket.CreationDateDateTime);
			}
            

		}

        // Get object in a bucket
        public async Task Run(string bucketName = "my-bucket-name",
                              string objectName = "my-object-name")
        {
            try
            {
                Console.WriteLine("Running example for API: GetObjectAsync");
                await minio.GetObjectAsync(bucketName, objectName,
                (stream) =>
                {
                    // Uncomment to print the file on output console

                });
                Console.WriteLine();
            }
            catch (Exception e)
            {
                Console.WriteLine($"[Bucket]  Exception: {e}");
            }
        }


    }

}
