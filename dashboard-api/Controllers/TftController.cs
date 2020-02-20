using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Refit;
using System.Collections.Generic;
using dashboardAPI.Models;
using dashboardAPI.Clients;
using Microsoft.Extensions.Configuration;

namespace dashboardAPI.Controllers
{
    [ApiController]
    [Route("/tft")]
    public class TftControllers : ControllerBase
    {
        #region MEMBERS
        private IConfiguration _settings;
        private readonly ILogger<TftControllers> _logger;
        private TftClient _TftClient;
        private CDragonClient _CDragonClient;
        //private ListAllChampModel _ListChampion;
        private AccountClient _AccountClient;

        private List<TftCampanionsModel> _CompanionsList;


        #endregion MEMBERS

        #region CONSTRUCTOR
        public TftControllers(ILogger<TftControllers> logger, IConfiguration iConfig)
        {
            _settings = iConfig;
            _TftClient = RestService.For<TftClient>("https://europe.api.riotgames.com/tft/match/v1/matches/");
            _CDragonClient = RestService.For<CDragonClient>("http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/");
            _AccountClient = RestService.For<AccountClient>("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/");
            _logger = logger;
        }

        #endregion CONSTRUCTOR

        #region METHODS
        private string GetPicureCampanion(string content_ID)
        {
            foreach (var item in _CompanionsList)
            {
                if (item.contentId == content_ID)
                    return (item.loadoutsIcon);
            }
            return ("tooltip_tft_avatar_blue.companions.png");
        }
        #endregion METHODS

        #region ROUTES

        [HttpGet("games/{matchId}")]
        public async Task<ActionResult<TftGameModel>> GetTftGameAsync(string matchId)
        {
            _logger.LogInformation($"Trying to get last games tft by ID: {matchId}");

            try {
                if (_CompanionsList == null) {
                    var Companions = await _CDragonClient.GetAllCampanionsAsync();
                    _CompanionsList = JsonConvert.DeserializeObject<List<TftCampanionsModel>>(Companions);
                    foreach (var item in _CompanionsList)
                    {
                        item.loadoutsIcon = item.loadoutsIcon.Split('/')[6].ToLower();
                    }
                }
                var token = _settings.GetSection("tft").GetSection("token").Value;
                var GamesUser = await _TftClient.GetGameAsync(token, matchId);
                var Result = JsonConvert.DeserializeObject<TftGameModel>(GamesUser);
                foreach (var participant in Result.info.participants)
                {
                    var Account = await _AccountClient.GetAccountByPuuidAsync(token, participant.puuid);
                    var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                    participant.name = ResAccount.name;
                    participant.companion.linkPicture = "http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/companions/" + GetPicureCampanion(participant.companion.content_ID);
                }
                return (Result);
            } catch (ApiException exception) {
                _logger.LogInformation($"Echec to get last games tft by ID: {exception.StatusCode}");
                return ( StatusCode((int)exception.StatusCode));
            }
            catch (Exception exc)
            {
                _logger.LogInformation($"Critical error: {exc.Message}");
                return (StatusCode(500));
            }
        }

        [HttpGet("history/{summonerName}")]
        public async Task<ActionResult<TftListHistoryModel>> GetTftHistoryAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get last games tft by name: {summonerName}");

            try {
                var token = _settings.GetSection("tft").GetSection("token").Value;
                var Account = await _AccountClient.GetAccountByNameAsync(token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var HistoryUser = await _TftClient.GetListHistoryAsync(token, ResAccount.puuid);
                TftListHistoryModel Result = new TftListHistoryModel();
                Result.data = HistoryUser;
                return (Result);
            } catch (ApiException exception) {
                _logger.LogInformation($"Trying to get last games tft by name: {exception.StatusCode}");
                return ( StatusCode((int)exception.StatusCode));
            }
            catch (Exception exc)
            {
                _logger.LogInformation($"Critical error: {exc.Message}");
                return (StatusCode(500));
            }
        }

        #endregion ROUTES

    }
}