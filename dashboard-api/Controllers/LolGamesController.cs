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
    [Route("/lol")]
    public class GamesController
    {
        #region MEMBERS
        private readonly ILogger<GamesController> _logger;
        private GamesClient _GamesClient;
        private AccountClient _AccountClient;
        private ChampionClient _ChampionClient;
        //private ListAllChampModel _ListChampion;

        private string _token;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public GamesController(ILogger<GamesController> logger)
        {
            _GamesClient = RestService.For<GamesClient>("https://euw1.api.riotgames.com/lol/match/v4/");
            _AccountClient = RestService.For<AccountClient>("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/");
            _ChampionClient = RestService.For<ChampionClient>("http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/");
            _logger = logger;
            _token = "RGAPI-d781b69e-f8f9-4689-b59a-d700c3f62a13";
        }

        #endregion CONSTRUCTOR

        #region ROUTES

        [HttpGet("games/{summonerName}")]
        public async Task<ListGamesModel> GetListGamesAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get 10 last games League Of Legend by name: {summonerName}");

            try {
                var Account = await _AccountClient.GetAccountAsync(_token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var GamesUser = await _GamesClient.GetListGamesAsync(_token, ResAccount.accountId);
                var Result = JsonConvert.DeserializeObject<ListGamesModel>(GamesUser);
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get 10 last games League Of Legend by name: {exception.Message}");
                return (null);
            }
        }

/*        private string GetNameChampion(string ID)
        {
            foreach(KeyValuePair<string, DataChampionModel> entry in _ListChampion.data)
            {
                if (ID == entry.Value.key) {
                    return (entry.Value.name);
                }
            }
            return ("NOTHING");
        }

        [HttpGet("details/{summonerName}")]
        public async Task<List<MasteriesClassDetail>> GetDetailsMasteriesAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get masteries account League Of Legend by name: {summonerName}");

            try {
                if (_ListChampion == null) {
                    var GetValueAllChamp = await _ChampionClient.GetAllChampAsync();
                    _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetValueAllChamp);
                }
                var Account = await _AccountClient.GetAccountAsync(_token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var AllMasteriesUser = await _MasteryClient.GetDetailsMasteryAsync(_token, ResAccount.id);
                var result = JsonConvert.DeserializeObject<List<MasteriesClassDetail>>(AllMasteriesUser);
                result[0].status_code = "200";
                result.ForEach(delegate(MasteriesClassDetail tmp)
                {
                    tmp.name = GetNameChampion(tmp.championId);
                    tmp.linkPicture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + tmp.name + ".png";

                });
                return (result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get account League Of Legend by name: {exception.Message}");
                return (null);
            }
        } */
        #endregion ROUTES

    }
}