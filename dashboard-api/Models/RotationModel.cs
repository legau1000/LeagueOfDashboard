using System.Collections.Generic;

namespace dashboardAPI.Models
{
    public class ChampRotationList
    {
        public string name { get; set; }
        public string linkPicture { get; set; }
        public int id { get; set; }
    }
    public class RotationModel
    {
        public List<int> freeChampionIds { get; set; }
    }
}