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
    [Route("/lol/account")]
    public class AccountController
    {
        #region MEMBERS
        private readonly ILogger<AccountController> _logger;
        private AccountClient _AccountClient;

        #endregion MEMBERS

        #region CONSTRUCTOR
        public AccountController(ILogger<AccountController> logger)
        {
            _AccountClient = RestService.For<AccountClient>("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/");
            _logger = logger;
        }

        #endregion CONSTRUCTOR

        #region ROUTES

        [HttpGet("{summonerName}")]
        public async Task<AccountModel> GetAccountIdAsync(string summonerName)
        {
            _logger.LogInformation($"Trying to get account League Of Legend by name: {summonerName}");

            try {
                var UserData = await _AccountClient.GetAccountAsync("RGAPI-d781b69e-f8f9-4689-b59a-d700c3f62a13", summonerName);
                var result = JsonConvert.DeserializeObject<AccountModel>(UserData);
                result.status_code = "200";
                result.profileIconId = "http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/" + result.profileIconId + ".png";
                return result;
            } catch (Exception exception) {
                _logger.LogInformation($"Echec to get account League Of Legend by name: {exception.Message}");
                var str = "{\"status_code\":\"" + exception.Message.Split(" ")[7] + "\",\"message\":\"" + exception.Message.Split(": ")[1] + "\"}";
                return (JsonConvert.DeserializeObject<AccountModel>(str));
            }
        }

        #endregion ROUTES

    }
}