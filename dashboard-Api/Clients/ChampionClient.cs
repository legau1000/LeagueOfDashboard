using Refit;
using System.Threading.Tasks;
using dashboardAPI.Models;

namespace dashboardAPI.Clients
{
    public interface ChampionClient
    {
        [Get("/champion.json")]
        Task<string> GetAllChampAsync();
    }
}