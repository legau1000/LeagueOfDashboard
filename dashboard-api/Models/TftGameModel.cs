using System.Collections.Generic;

namespace dashboardAPI.Models
{
    public class TftCompanionGame
    {
        public string content_ID { get; set; }
        public string linkPicture { get; set; }
    }
    public class TftGameListParticipan
    {
        public TftCompanionGame companion { get; set; }
        public int gold_left { get; set; }
        public int last_round { get; set; }
        public int level { get; set; }
        public int placement { get; set; }
        public string puuid { get; set; }
        public string name { get; set; }
    }
    public class TftInfoGames
    {
        public long game_datetime { get; set; }
        public long game_length { get; set; }
        public List<TftGameListParticipan> participants { get; set; }
    }

    public class TftGameModel
    {
        public TftInfoGames info { get; set; }
    }
}