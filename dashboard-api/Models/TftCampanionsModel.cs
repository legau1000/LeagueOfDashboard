namespace dashboardAPI.Models
{
    public class TftCampanionsModel
    {
        public string contentId { get; set; }
        public int itemId { get; set; }
        public string name { get; set; }
        public string loadoutsIcon { get; set; }
        public string description { get; set; }
        public int level { get; set; }
        public string speciesName { get; set; }
        public int speciesId { get; set; }
        public string rarity { get; set; }
        public bool isDefault { get; set; }
    }
}