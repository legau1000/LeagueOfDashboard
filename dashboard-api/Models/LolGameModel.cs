using System.Collections.Generic;

namespace dashboardAPI.Models
{
    public class TeamBansDto
    {
        public int pickTurn { get; set; }
        public int championId { get; set; }
        public string name { get; set; }
        public string linkPicture { get; set; }
    }
    public class TeamStatsDto
    {
        public int teamId { get; set; }
        public string teamColor { get; set; }
        public string win { get; set; }
        public List<TeamBansDto> bans { get; set; }
    }

    public class ParticipantTimelineDto
    {
        public string role { get; set; }
        public string lane { get; set; }
    }

    public class ParticipantStatsDto
    {
        public bool win { get; set; }
        public int item0 { get; set; }
        public string item0Picture { get; set; }
        public int item1 { get; set; }
        public string item1Picture { get; set; }
        public int item2 { get; set; }
        public string item2Picture { get; set; }
        public int item3 { get; set; }
        public string item3Picture { get; set; }
        public int item4 { get; set; }
        public string item4Picture { get; set; }
        public int item5 { get; set; }
        public string item5Picture { get; set; }
        public int item6 { get; set; }
        public string item6Picture { get; set; }
        public int kills { get; set; }
        public int deaths { get; set; }
        public int assists { get; set; }
    }
    public class ParticipantDto
    {
        public string name { get; set; }
        public int participantId { get; set; }
        public int teamId { get; set; }
        public int championId { get; set; }
        public string championIdPicture { get; set; }
        public string championName { get; set; }
        public string spell1Id { get; set; }
        public string spell1IdPicture { get; set; }
        public string spell2Id { get; set; }
        public string spell2IdPicture { get; set; }
        public ParticipantStatsDto stats { get; set; }
        public ParticipantTimelineDto timeline { get; set; }
    }

    public class ParticipantIdentityDtoAccount
    {
        public string accountId { get; set; }
        public string summonerId { get; set; }
        public int profileIcon { get; set; }
        public string summonerName { get; set; }
    }

    public class ParticipantIdentityDto
    {
        public int participantId { get; set; }
        public ParticipantIdentityDtoAccount player { get; set; }

    }
    public class GameModel
    {
        public long gameId { get; set; }
        public string platformId { get; set; }
        public int queueId { get; set; }
        public int mapId { get; set; }
        public int seasonId { get; set; }
        public string gameVersion { get; set; }
        public string gameMode { get; set; }
        public string gameType { get; set; }
        public List<TeamStatsDto> teams { get; set; }
        public List<ParticipantDto> participants { get; set; }
        public List<ParticipantIdentityDto > participantIdentities { get; set; }
    }
}