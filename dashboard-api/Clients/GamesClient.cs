using Refit;
using System.Threading.Tasks;
using dashboardAPI.Models;

namespace dashboardAPI.Clients
{
    public interface GamesClient
    {
        [Get("/matchlists/by-account/{encryptedAccountId}")]
        Task<string> GetListGamesAsync([Header("X-Riot-Token")] string authorization, string encryptedAccountId);
    }
}