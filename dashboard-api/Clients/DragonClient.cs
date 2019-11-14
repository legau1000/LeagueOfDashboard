using Refit;
using System.Threading.Tasks;

namespace dashboardAPI.Clients
{
    public interface DragonClient
    {
        [Get("/champion.json")]
        Task<string> GetAllChampAsync();
        [Get("/item.json")]
        Task<string> GetAllItemsAsync();
        [Get("/summoner.json")]
        Task<string> GetAllSummonersAsync();
    }
}