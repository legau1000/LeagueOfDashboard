using Refit;
using System.Threading.Tasks;
using dashboardAPI.Models;

namespace dashboardAPI.Clients
{
    public interface LolMasteryAccountClient
    {
        [Get("/{summonerName}")]
        Task<AccountModel> GetUserAsync(string summonerName);
    }

    public interface LolMasteryClient
    {
        [Get("/scores/by-summoner/{encryptedSummonerId}")]
        Task<string> GetMasteryAsync([Header("X-Riot-Token")] string authorization, string encryptedSummonerId);

        [Get("/champion-masteries/by-summoner/{encryptedSummonerId}")]
        Task<string> GetDetailsMasteryAsync([Header("X-Riot-Token")] string authorization, string encryptedSummonerId);
        [Get("/champion.json")]
        Task<string> GetAllChampAsync();
    }
}