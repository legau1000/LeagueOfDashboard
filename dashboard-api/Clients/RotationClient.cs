using Refit;
using System.Threading.Tasks;
using dashboardAPI.Models;

namespace dashboardAPI.Clients
{
    public interface RotationClient
    {
        [Get("")]
        Task<string> GetRotationChampionsAsync([Header("X-Riot-Token")] string authorization);
    }
}