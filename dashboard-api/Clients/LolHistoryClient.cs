using Refit;
using System.Threading.Tasks;

namespace dashboardAPI.Clients
{
    public interface LolHistoryClient
    {
        [Get("/matchlists/by-account/{encryptedAccountId}")]
        Task<string> GetListHistoryAsync([Header("X-Riot-Token")] string authorization, string encryptedAccountId);

        [Get("/matchlists/by-account/{encryptedAccountId}?endIndex={endIndex}")]
        Task<string> GetListHistoryByChampAsync([Header("X-Riot-Token")] string authorization, string encryptedAccountId, [Query] int endIndex);
    }
}