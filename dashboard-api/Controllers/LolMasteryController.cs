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
    [Route("/lol/masteries")]
    public class MasteryController : ControllerBase
    {
        #region MEMBERS
        private IConfiguration _settings;
        private readonly ILogger<MasteryController> _logger;
        private LolMasteryClient _MasteryClient;
        private AccountClient _AccountClient;

        private DragonClient _DragonClient;

        private ListAllChampModel _ListChampion;


        #endregion MEMBERS

        #region CONSTRUCTOR
        public MasteryController(ILogger<MasteryController> logger, IConfiguration iConfig)
        {
            _settings = iConfig;
            _MasteryClient = RestService.For<LolMasteryClient>("https://euw1.api.riotgames.com/lol/champion-mastery/v4/");
            _AccountClient = RestService.For<AccountClient>("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/");
            _DragonClient = RestService.For<DragonClient>("http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/");
            _logger = logger;
            InitClassMasteryControllerAsync();
        }

        public async void InitClassMasteryControllerAsync()
        {
            string GetDataAllChamp = await _DragonClient.GetAllChampAsync();
            _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetDataAllChamp);
        }

        #endregion CONSTRUCTOR

        #region METHODS

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

        #endregion METHODS

        #region ROUTES

        [HttpGet("{summonerName}")]
        public async Task<ActionResult<MasteriesModel>> GetMasteriesIdAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get masteries account League Of Legend by name: {summonerName}");

            try {
                var token = _settings.GetSection("lol").GetSection("token").Value;
                var Account = await _AccountClient.GetAccountByNameAsync(token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var MasteriesUser = await _MasteryClient.GetMasteryAsync(token, ResAccount.id);
                var Result = new MasteriesModel();
                Result.level = MasteriesUser;
                return (Result);
            } catch (ApiException exception) {
                _logger.LogInformation($"Echec to get account League Of Legend by name: {exception.StatusCode}");
                return ( StatusCode((int)exception.StatusCode));
            }
            catch (Exception exc)
            {
                _logger.LogInformation($"Critical error: {exc.Message}");
                return (StatusCode(500));
            }
        }

        [HttpGet("details/{summonerName}")]
        public async Task<ActionResult<List<MasteriesClassDetail>>> GetDetailsMasteriesAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get masteries account League Of Legend by name: {summonerName}");

            try {
                if (_ListChampion == null) {
                    var GetValueAllChamp = await _DragonClient.GetAllChampAsync();
                    _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetValueAllChamp);
                }
                var token = _settings.GetSection("lol").GetSection("token").Value;
                var Account = await _AccountClient.GetAccountByNameAsync(token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var AllMasteriesUser = await _MasteryClient.GetDetailsMasteryAsync(token, ResAccount.id);
                var result = JsonConvert.DeserializeObject<List<MasteriesClassDetail>>(AllMasteriesUser);
                result.ForEach(delegate(MasteriesClassDetail tmp)
                {
                    tmp.name = GetNameChampion(tmp.championId);
                    tmp.linkPicture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + GetPictureChampion(tmp.championId);

                });
                return (result);
            } catch (ApiException exception) {
                _logger.LogInformation($"Echec to get account League Of Legend by name: {exception.StatusCode}");
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