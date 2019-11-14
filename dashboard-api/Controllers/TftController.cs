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
    [Route("/tft")]
    public class TftControllers
    {
        #region MEMBERS
        private readonly ILogger<TftControllers> _logger;
        private TftClient _TftClient;
        private DragonClient _DragonClient;
        //private ListAllChampModel _ListChampion;
        private AccountClient _AccountClient;

        private string _token;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public TftControllers(ILogger<TftControllers> logger)
        {
            _TftClient = RestService.For<TftClient>("https://europe.api.riotgames.com/tft/match/v1/matches/");
            _DragonClient = RestService.For<DragonClient>("http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/");
            _AccountClient = RestService.For<AccountClient>("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/");
            _logger = logger;
            _token = "RGAPI-4ac29b23-365b-4a15-bc50-a0632a3b08eb";
        }

        #endregion CONSTRUCTOR

        #region ROUTES
/*
        [HttpGet("/games/{matchId}")]
        public async Task<GameModel> GetTftGameAsync(long matchId)
        {
            _logger.LogInformation($"Trying to get last games tft by ID: {matchId}");

            try {
                var GamesUser = await _TftClient.GetGameAsync(_token, matchId);
                var Result = JsonConvert.DeserializeObject<GameModel>(GamesUser);
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get 100 last games League Of Legend by name: {exception.Message}");
                return (null);
            }
        }
*/
        [HttpGet("history/{summonerName}")]
        public async Task<TftListHistoryModel> GetTftHistoryAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get last games tft by name: {summonerName}");

            try {
                var Account = await _AccountClient.GetAccountAsync(_token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var HistoryUser = await _TftClient.GetListHistoryAsync(_token, ResAccount.puuid);
                TftListHistoryModel Result = new TftListHistoryModel();
                Result.data = HistoryUser;
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Trying to get last games tft by name: {exception.Message}");
                return (null);
            }
        }

        #endregion ROUTES

    }
}