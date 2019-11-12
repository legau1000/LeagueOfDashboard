using Refit;
using System.Threading.Tasks;

namespace dashboardAPI.Clients
{
    public interface GameClient
    {
        [Get("/{matchId}")]
        Task<string> GetGameAsync([Header("X-Riot-Token")] string authorization, long matchId);
    }
}