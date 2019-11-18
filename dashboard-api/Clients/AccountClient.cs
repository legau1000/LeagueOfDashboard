using Refit;
using System.Threading.Tasks;

namespace dashboardAPI.Clients
{
    public interface AccountClient
    {
        [Get("/by-name/{summonerName}")]
        Task<string> GetAccountByNameAsync([Header("X-Riot-Token")] string authorization, string summonerName);

        [Get("/by-puuid/{encryptedPUUID}")]
        Task<string> GetAccountByPuuidAsync([Header("X-Riot-Token")] string authorization, string encryptedPUUID);
    }
}