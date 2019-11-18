using System.Collections.Generic;

namespace dashboardAPI.Models
{
    public class ImageModel
    {
        public string full { get; set; }
        public string sprite { get; set; }        
    }
    public class DataItemModel
    {
        public string name { get; set; }
        public string description { get; set; }
        public ImageModel image { get; set; }
    }
    public class DataItemsModel : Dictionary<int, DataItemModel>
    {

    }
    public class ListItemsModel
    {
        public DataItemsModel data { get; set; }
    }
}