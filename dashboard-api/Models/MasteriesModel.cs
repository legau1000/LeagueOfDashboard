using System.Collections.Generic;

namespace dashboardAPI.Models
{
    public class StatusRequest
    {
        public string message { get; set; }
        public string status_code { get; set; }
    }
    public class MasteriesModel
    {
        public string level { get; set; }
        public string message { get; set; }
        public string status_code { get; set; }
    }

    public class MasteriesClassDetail
    {
        public int championId { get; set; }
        public string championLevel { get; set; }
        public string championPoints { get; set; }
        public string lastPlayTime { get; set; }
        public string championPointsSinceLastLevel { get; set; }
        public string championPointsUntilNextLevel { get; set; }
        public string chestGranted { get; set; }
        public string tokensEarned { get; set; }
        public string summonerId { get; set; }
        public string name { get; set; }
        public string linkPicture { get; set; }
        public string message { get; set; }
        public string status_code { get; set; }
    }
    public class DetailsMasteriesModel
    {
        public List<MasteriesClassDetail> ChampionMasteryDTO { get; set; }
    }
}