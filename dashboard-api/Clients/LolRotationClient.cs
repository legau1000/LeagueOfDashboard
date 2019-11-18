using Refit;
using System.Threading.Tasks;

namespace dashboardAPI.Clients
{
	public interface LolRotationClient
	{
		[Get("")]
		Task<string> GetRotationChampionsAsync([Header("X-Riot-Token")] string authorization);
	}
}