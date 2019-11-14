using Refit;
using System.Threading.Tasks;

namespace dashboardAPI.Clients
{
    public interface LolGameClient
    {
        [Get("/{matchId}")]
        Task<string> GetGameAsync([Header("X-Riot-Token")] string authorization, long matchId);
    }
}