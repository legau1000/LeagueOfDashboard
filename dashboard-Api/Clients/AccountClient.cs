using Refit;
using System.Threading.Tasks;
using dashboardAPI.Models;

namespace dashboardAPI.Clients
{
    public interface AccountClient
    {
        [Get("/{summonerName}")]
        Task<string> GetAccountAsync([Header("X-Riot-Token")] string authorization, string summonerName);
    }
}