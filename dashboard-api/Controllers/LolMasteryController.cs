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
    [Route("/lol/masteries")]
    public class MasteryController
    {
        #region MEMBERS
        private readonly ILogger<MasteryController> _logger;
        private MasteryClient _MasteryClient;
        private AccountClient _AccountClient;

        private DragonClient _DragonClient;

        private ListAllChampModel _ListChampion;

        private string _token;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public MasteryController(ILogger<MasteryController> logger)
        {
            _MasteryClient = RestService.For<MasteryClient>("https://euw1.api.riotgames.com/lol/champion-mastery/v4/");
            _AccountClient = RestService.For<AccountClient>("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/");
            _DragonClient = RestService.For<DragonClient>("http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/");
            _logger = logger;
            _token = "RGAPI-d781b69e-f8f9-4689-b59a-d700c3f62a13";
            InitClassMasteryControllerAsync();
        }

        public async void InitClassMasteryControllerAsync()
        {
            string GetDataAllChamp = await _DragonClient.GetAllChampAsync();
            _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetDataAllChamp);
        }

        #endregion CONSTRUCTOR

        #region ROUTES

        [HttpGet("{summonerName}")]
        public async Task<MasteriesModel> GetMasteriesIdAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get masteries account League Of Legend by name: {summonerName}");

            try {
                var Account = await _AccountClient.GetAccountAsync(_token, summonerName);
                var ResAccount = JsonConvert.DeserializeObject<AccountModel>(Account);
                var MasteriesUser = await _MasteryClient.GetMasteryAsync(_token, ResAccount.id);
                var Result = new MasteriesModel();
                Result.level = MasteriesUser;
                Result.status_code = "200";
                return (Result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get account League Of Legend by name: {exception.Message}");
                var str = "{\"status_code\":\"" + exception.Message.Split(" ")[7] + "\",\"message\":\"" + exception.Message.Split(": ")[1] + "\"}";
                return (JsonConvert.DeserializeObject<MasteriesModel>(str));
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

        [HttpGet("details/{summonerName}")]
        public async Task<ActionResult<List<MasteriesClassDetail>>> GetDetailsMasteriesAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get masteries account League Of Legend by name: {summonerName}");

            try {
                if (_ListChampion == null) {
                    var GetValueAllChamp = await _DragonClient.GetAllChampAsync();
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
                    tmp.linkPicture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + GetPictureChampion(tmp.championId);

                });
                return (result);
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get account League Of Legend by name: {exception.Message}");
                var tmp = new BadRequestObjectResult(new MasteriesClassDetail());
                return (tmp);
            }
        }
        #endregion ROUTES

    }
}