using Refit;
using System.Threading.Tasks;

namespace dashboardAPI.Clients
{
    public interface CDragonClient
    {
        [Get("/companions.json")]
        Task<string> GetAllCampanionsAsync();
    }
}