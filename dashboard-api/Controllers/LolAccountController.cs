using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Refit;
using dashboardAPI.Models;
using dashboardAPI.Clients;
using Microsoft.Extensions.Configuration;

namespace dashboardAPI.Controllers
{
    [ApiController]
    [Route("/lol/account")]
    public class AccountController : ControllerBase
    {
        #region MEMBERS
        private IConfiguration _settings;
        private readonly ILogger<AccountController> _logger;
        private AccountClient _AccountClient;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public AccountController(ILogger<AccountController> logger, IConfiguration iConfig)
        {
            _settings = iConfig;
            _AccountClient = RestService.For<AccountClient>("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/");
            _logger = logger;
        }

        #endregion CONSTRUCTOR

        #region METHODS
        #endregion METHODS

        #region ROUTES

        [HttpGet("{summonerName}")]
        public async Task<ActionResult<AccountModel>> GetAccountIdAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get account League Of Legend by name: {summonerName}");

            try {
                var token = _settings.GetSection("lol").GetSection("token").Value;
                var UserData = await _AccountClient.GetAccountByNameAsync(token, summonerName);
                var result = JsonConvert.DeserializeObject<AccountModel>(UserData);
                result.profileIconId = "http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/" + result.profileIconId + ".png";
                return result;
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