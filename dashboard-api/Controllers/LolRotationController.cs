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
    [Route("/lol/rotation")]
    public class RotationController : ControllerBase
    {
        #region MEMBERS
        private IConfiguration _settings;
        private readonly ILogger<MasteryController> _logger;
        private LolRotationClient _RotationClient;
        private DragonClient _DragonClient;

        private ListAllChampModel _ListChampion;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public RotationController(ILogger<MasteryController> logger, IConfiguration iConfig)
        {
            _settings = iConfig;
            _RotationClient = RestService.For<LolRotationClient>("https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations");
            _DragonClient = RestService.For<DragonClient>("http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US");
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

        [HttpGet("")]
        public async Task<ActionResult<List<ChampRotationList>>> GetRotationChampionsAsync()
        {
            _logger.LogInformation("Trying to get Rotation Champion League Of Legend");

            try {
                if (_ListChampion == null) {
                    var GetValueAllChamp = await _DragonClient.GetAllChampAsync();
                    _ListChampion = JsonConvert.DeserializeObject<ListAllChampModel>(GetValueAllChamp);
                }
                var token = _settings.GetSection("lol").GetSection("token").Value;
                var AllMasteriesUser = await _RotationClient.GetRotationChampionsAsync(token);
                var result = JsonConvert.DeserializeObject<RotationModel>(AllMasteriesUser);
                string name;
                ChampRotationList tmpRotation = null;
                List<ChampRotationList> tmpListRotation = new List<ChampRotationList>();
                foreach(var IdChamp in result.freeChampionIds)
                {
                    tmpRotation = new ChampRotationList();
                    name = GetNameChampion(IdChamp);
                    tmpRotation.id = IdChamp;
                    tmpRotation.name = name;
                    tmpRotation.linkPicture = "http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/" + GetPictureChampion(IdChamp);
                    tmpListRotation.Add(tmpRotation);
                }
                return (tmpListRotation);
            } catch (ApiException exception) {
                _logger.LogInformation($"Echec to get Rotation Champion League Of Legend: {exception.StatusCode}");
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