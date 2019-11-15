using Refit;
using System.Threading.Tasks;
using System.Collections.Generic;
using dashboardAPI.Models;

namespace dashboardAPI.Clients
{
	public interface TftClient
	{
		[Get("/by-puuid/{encryptedPUUID}/ids")]
		Task<List<string>> GetListHistoryAsync([Header("X-Riot-Token")] string authorization, string encryptedPUUID);

		[Get("/{matchId}")]
		Task<string> GetGameAsync([Header("X-Riot-Token")] string authorization, string matchId);
	}
}