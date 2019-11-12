using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;
using Refit;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using dashboardAPI.Models;
using dashboardAPI.Clients;

namespace dashboardAPI.Controllers
{
    [ApiController]
    [Route("/lol/game")]
    public class GameControllers
    {
        #region MEMBERS
        private readonly ILogger<GameControllers> _logger;
        private GameClient _GameClient;
        private ChampionClient _ChampionClient;
        //private ListAllChampModel _ListChampion;
        private ListAllChampModel _ListChampion;

        private string _token;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public GameControllers(ILogger<GameControllers> logger)
        {
            _GameClient = RestService.For<GameClient>("https://euw1.api.riotgames.com/lol/match/v4/matches/");
            _ChampionClient = RestService.For<ChampionClient>("http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US");
            _logger = logger;
            _token = "RGAPI-d781b69e-f8f9-4689-b59a-d700c3f62a13";
        }

        #endregion CONSTRUCTOR

        #region ROUTES

        [HttpGet("{matchId}")]
        public async Task<GameModel> GetGameAsync(long matchId)
        {
            _logger.LogInformation($"Trying to get 100 last games League Of Legend by name: {matchId}");

            try {
                if (_ListChampion == null) {
                    var GetValueAllChamp = await _ChampionClient.GetAllChampAsync();
                    _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetValueAllChamp);
                }
                var GamesUser = await _GameClient.GetGameAsync(_token, matchId);
                var Result = JsonConvert.DeserializeObject<GameModel>(GamesUser);
                foreach (var item in Result.teams)
                {
                    if (item.teamId == 100) {
                        item.teamColor = "blue";
                    } else {
                        item.teamColor = "red";
                    }
                }
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get 100 last games League Of Legend by name: {exception.Message}");
                return (null);
            }
        }

        private ListHistoryModel AnalyseDatasGetGale(ListHistoryModel Result)
        {
            string name;
            foreach (MatchReferenceDto item in Result.matches)
            {
                name = GetNameChampion(item.champion);
                item.namechampion = name;
                item.picturechampion = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + name + ".png";
            }
            return (Result);
        }
        private string GetNameChampion(string ID)
        {
            foreach(KeyValuePair<string, DataChampionModel> entry in _ListChampion.data)
            {
                if (ID == entry.Value.key) {
                    return (entry.Value.name);
                }
            }
            return ("NOTHING");
        }

        #endregion ROUTES

    }
}