using System.Collections.Generic;

namespace dashboardAPI.Models
{
    public class MatchReferenceDto
    {
        public string lane { get; set; }
        public long gameId { get; set; }
        public int champion { get; set; }
        public string platformId { get; set; }
        public int season { get; set; }
        public int queue { get; set; }
        public string role { get; set; }
        public long timestamp { get; set; }
    }
    public class ListGamesModel
    {
        public List<MatchReferenceDto> matches { get; set; }
        public int startIndex { get; set; }
        public int endIndex { get; set; }
        public int totalGames { get; set; }
    }
}