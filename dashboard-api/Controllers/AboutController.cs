using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dashboardAPI.Models;
using System.Collections.Generic;

namespace dashboardAPI.Controllers
{
    [ApiController]
    [Route("/about.json")]
    public class AboutControllers
    {
        #region MEMBERS
        private readonly ILogger<AboutControllers> _logger;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public AboutControllers(ILogger<AboutControllers> logger)
        {
            _logger = logger;
        }

        #endregion CONSTRUCTOR

        private AboutServieWidgetsModel CreateWidget(string name, string description, List<string> paramsName, List<string> paramsType)
        {
            var index = 0;
            var Widget = new AboutServieWidgetsModel();
            Widget.name = name;
            Widget.description = description;
            Widget.Params = new List<AboutServieWidgetsParamsModel>();
            foreach (string data in paramsName)
            {
                var NewWidget = new AboutServieWidgetsParamsModel();
                NewWidget.name = data;
                NewWidget.type = paramsType[index];
                Widget.Params.Add(NewWidget);
                index = index = 1;
            }
            return (Widget);
        }

        #region ROUTES

        [HttpGet("")]
        public ActionResult<AboutModel> GetAboutJsonAsync()
        {
            _logger.LogInformation("Trying to get About Json");

            try {
                AboutModel Result = new AboutModel();
                Result.client = new AboutClientModel();
                Result.client.host = "localhost:5001";
                Result.server = new AboutServerModel();
                Result.server.current_time = (int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
                Result.server.services = new List<AboutServivesModel>();
                AboutServivesModel LolService = new AboutServivesModel();
                LolService.name = "League Of Leagends";
                LolService.widgets = new List<AboutServieWidgetsModel>();
                LolService.widgets.Add(CreateWidget("Player Account", "Get informations of player account", new List<string> {"summonerName"}, new List<string> {"string"}));
                LolService.widgets.Add(CreateWidget("Player Match", "Get informations of match", new List<string> {"matchId"}, new List<string> {"string"}));
                LolService.widgets.Add(CreateWidget("Player History", "Get ID of 100 last player History", new List<string> {"summonerName", "endIndex"}, new List<string> {"string", "int"}));
                LolService.widgets.Add(CreateWidget("Player masteries", "Get information of player masteries", new List<string> {"summonerName"}, new List<string> {"string"}));
                LolService.widgets.Add(CreateWidget("Player masteries detailed", "Get information of player masteries per legends", new List<string> {"summonerName"}, new List<string> {"string"}));
                LolService.widgets.Add(CreateWidget("Free champion Rotation", "Get information of free champion rotation", new List<string> {""}, new List<string> {""}));
                Result.server.services.Add(LolService);
                AboutServivesModel TftService = new AboutServivesModel();
                TftService.name = "Team Fight Tactics";
                TftService.widgets = new List<AboutServieWidgetsModel>();
                TftService.widgets.Add(CreateWidget("Player Match", "Get informations of match", new List<string> {"matchId"}, new List<string> {"string"}));
                TftService.widgets.Add(CreateWidget("Player History", "Get ID of History player", new List<string> {"summonerName"}, new List<string> {"string"}));
                Result.server.services.Add(TftService);
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get About Json: {exception.Message}");
                return (null);
            }
        }

        #endregion ROUTES

    }
}