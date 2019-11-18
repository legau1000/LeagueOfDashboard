using System.Collections.Generic;

namespace dashboardAPI.Models
{
    public class AboutClientModel
    {
        public string host { get; set; }
    }

    public class AboutServieWidgetsParamsModel
    {
        public string name { get; set; }
        public string type { get; set; }
    }

    public class AboutServieWidgetsModel
    {
        public string name { get; set; }
        public string description { get; set; }
        public List<AboutServieWidgetsParamsModel> Params { get; set; }
    }
    public class AboutServivesModel
    {
        public string name { get; set; }
        public List<AboutServieWidgetsModel> widgets { get; set; }
    }
    public class AboutServerModel
    {
        public int current_time { get; set; }
        public List<AboutServivesModel> services { get; set; }        
    }
    public class AboutModel
    {
        public AboutClientModel client { get; set; }
        public AboutServerModel server { get; set; }
    }
}