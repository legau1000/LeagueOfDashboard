using System.Collections.Generic;
using Newtonsoft.Json;

namespace dashboardAPI.Models
{
    public class DataChampionImageModel
    {
        public string full { get; set; }
        public string sprite { get; set; }
        public string group { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int w { get; set; }
        public int h { get; set; }
    }
    public class DataChampionModel
    {
        public string version { get; set; }
        public string id { get; set; }
        public string key { get; set; }
        public string name { get; set; }
        public string title { get; set; }
        [JsonProperty(PropertyName = "blurb")]
        public string description { get; set; }
        public DataChampionImageModel image { get; set; }
        public string partype { get; set; }
    }
    public class ListChampModel : Dictionary<string, DataChampionModel>
    {
    }
    public class ListAllChampModel
    {
        public string type { get; set; }
        public string format { get; set; }
        public string version { get; set; }
        public ListChampModel data { get; set; }
    }
}