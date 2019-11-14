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
    [Route("/lol/games")]
    public class GameControllers
    {
        #region MEMBERS
        private readonly ILogger<GameControllers> _logger;
        private LolGameClient _GameClient;
        private DragonClient _DragonClient;
        //private ListAllChampModel _ListChampion;
        private ListAllChampModel _ListChampion;
        private ListItemsModel _ListItems;
        private ListSummonersModel _ListSummoners;

        private string _token;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public GameControllers(ILogger<GameControllers> logger)
        {
            _GameClient = RestService.For<LolGameClient>("https://euw1.api.riotgames.com/lol/match/v4/matches/");
            _DragonClient = RestService.For<DragonClient>("http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US");
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
                    var GetValueAllChamp = await _DragonClient.GetAllChampAsync();
                    _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetValueAllChamp);
                }
                if (_ListItems == null) {
                    var GetValueAllItems = await _DragonClient.GetAllItemsAsync();
                    _ListItems = JsonConvert.DeserializeObject<ListItemsModel>(GetValueAllItems);
                }
                if (_ListSummoners == null) {
                    var GetValueAllSummoners = await _DragonClient.GetAllSummonersAsync();
                    _ListSummoners = JsonConvert.DeserializeObject<ListSummonersModel >(GetValueAllSummoners);
                }
                var GamesUser = await _GameClient.GetGameAsync(_token, matchId);
                var Result = JsonConvert.DeserializeObject<GameModel>(GamesUser);
                AnalyseTeam(Result);
                AnalyseParticipants(Result);
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get 100 last games League Of Legend by name: {exception.Message}");
                return (null);
            }
        }
        private void AnalyseParticipants(GameModel Result)
        {
            int index = 0;

            foreach (var item in Result.participants)
            {
                _logger.LogInformation($"lel: {Result.participantIdentities[index].player.summonerName}");
                item.name = Result.participantIdentities[index].player.summonerName;
                item.championName = GetNameChampion(item.championId);
                item.championIdPicture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + GetPictureChampion(item.championId);
                item.spell1IdPicture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/spell/" + GetPictureSummoner(item.spell1Id);
                item.spell2IdPicture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/spell/" + GetPictureSummoner(item.spell2Id);
                item.stats.item0Picture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/" + GetPictureItem(item.stats.item0);
                item.stats.item1Picture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/" + GetPictureItem(item.stats.item1);
                item.stats.item2Picture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/" + GetPictureItem(item.stats.item2);
                item.stats.item3Picture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/" + GetPictureItem(item.stats.item3);
                item.stats.item4Picture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/" + GetPictureItem(item.stats.item4);
                item.stats.item5Picture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/" + GetPictureItem(item.stats.item5);
                item.stats.item6Picture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/" + GetPictureItem(item.stats.item6);
                index = index + 1;
            }
        }

        private void AnalyseTeam(GameModel Result)
        {
            foreach (var item in Result.teams)
            {
                if (item.teamId == 100) {
                    item.teamColor = "blue";
                } else {
                    item.teamColor = "red";
                }
                foreach (var ban in item.bans)
                {
                    ban.name = GetNameChampion(ban.championId);
                    ban.linkPicture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + GetPictureChampion(ban.championId);
                }
            }
        }
        private string GetNameChampion(int ID)
        {
            foreach(KeyValuePair<string, DataChampionModel> entry in _ListChampion.data)
            {
                if (ID == entry.Value.key) {
                    return (entry.Value.name);
                }
            }
            return ("UNKNOW");
        }

        private string GetPictureChampion(int ID)
        {
            foreach(KeyValuePair<string, DataChampionModel> entry in _ListChampion.data)
            {
                if (ID == entry.Value.key) {
                    return (entry.Value.image.full);
                }
            }
            return ("UNKNOW");
        }

        private string GetPictureItem(int ID)
        {
            foreach(KeyValuePair<int, DataItemModel> entry in _ListItems.data)
            {
                if (ID == entry.Key) {
                    return (entry.Value.image.full);
                }
            }
            return ("979.png");
        }
        private string GetPictureSummoner(string ID)
        {
            foreach(KeyValuePair<string, DataSummonerModel> entry in _ListSummoners.data)
            {
                if (ID == entry.Value.key) {
                    return (entry.Value.image.full);
                }
            }
            return ("UNKNOW");
        }

        #endregion ROUTES

    }
}