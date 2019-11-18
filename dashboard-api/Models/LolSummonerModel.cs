using System.Collections.Generic;

namespace dashboardAPI.Models
{
    public class DataSummonerModel
    {
        public string id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string key { get; set; }
        public ImageModel image { get; set; }
    }
    public class DataSummonersModel : Dictionary<string, DataSummonerModel>
    {

    }
    public class ListSummonersModel
    {
        public DataSummonersModel data { get; set; }
    }
}