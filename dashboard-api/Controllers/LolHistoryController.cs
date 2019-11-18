using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Refit;
using System.Collections.Generic;
using dashboardAPI.Models;
using dashboardAPI.Clients;

namespace dashboardAPI.Controllers
{
    [ApiController]
    [Route("/lol/history")]
    public class HistoryController
    {
        #region MEMBERS
        private readonly ILogger<HistoryController> _logger;
        private LolHistoryClient _HistoryClient;
        private AccountClient _AccountClient;
        private DragonClient _DragonClient;
        //private ListAllChampModel _ListChampion;
        private ListAllChampModel _ListChampion;

        private string _token;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public HistoryController(ILogger<HistoryController> logger)
        {
            _HistoryClient = RestService.For<LolHistoryClient>("https://euw1.api.riotgames.com/lol/match/v4/");
            _AccountClient = RestService.For<AccountClient>("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/");
            _DragonClient = RestService.For<DragonClient>("http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US");
            _logger = logger;
            _token = "RGAPI-d781b69e-f8f9-4689-b59a-d700c3f62a13";
        }

        #endregion CONSTRUCTOR

        #region ROUTES

        [HttpGet("{summonerName}")]
        public async Task<ListHistoryModel> GetListGamesAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get 100 last games League Of Legend by name: {summonerName}");

            try {
                if (_ListChampion == null) {
                    var GetValueAllChamp = await _DragonClient.GetAllChampAsync();
                    _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetValueAllChamp);
                }
                var Account = await _AccountClient.GetAccountByNameAsync(_token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var GamesUser = await _HistoryClient.GetListHistoryAsync(_token, ResAccount.accountId);
                var Result = JsonConvert.DeserializeObject<ListHistoryModel>(GamesUser);
                Result = AnalyseDatasGetGale(Result);
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get 100 last games League Of Legend by name: {exception.Message}");
                return (null);
            }
        }

        [HttpGet("{summonerName}/{endIndex}")]
        public async Task<ListHistoryModel> GetListGamesAsync(string summonerName, int endIndex)
        {
            _logger.LogInformation($"Trying to get {endIndex} last games League Of Legend by name: {summonerName}");

            try {
                if (_ListChampion == null) {
                    var GetValueAllChamp = await _DragonClient.GetAllChampAsync();
                    _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetValueAllChamp);
                }
                var Account = await _AccountClient.GetAccountByNameAsync(_token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var GamesUser = await _HistoryClient.GetListHistoryByChampAsync(_token, ResAccount.accountId, endIndex);
                var Result = JsonConvert.DeserializeObject<ListHistoryModel>(GamesUser);
                Result = AnalyseDatasGetGale(Result);
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get {endIndex} last games League Of Legend by name: {exception.Message}");
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
                item.picturechampion = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + GetPictureChampion(item.champion);
            }
            return (Result);
        }
        private string GetNameChampion(int ID)
        {
            foreach(KeyValuePair<string, DataChampionModel> entry in _ListChampion.data)
            {
                if (ID == entry.Value.key) {
                    return (entry.Value.name);
                }
            }
            return ("NOTHING");
        }

        private string GetPictureChampion(int ID)
        {
            foreach(KeyValuePair<string, DataChampionModel> entry in _ListChampion.data)
            {
                if (ID == entry.Value.key) {
                    return (entry.Value.image.full);
                }
            }
            return ("NOTHING");
        }

        #endregion ROUTES

    }
}