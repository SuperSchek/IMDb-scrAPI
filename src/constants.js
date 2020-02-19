const constants = {
  QUERY_URL: "https://www.imdb.com/find?q=%query%&s=tt",
  QUERY_PLACEHOLDER: "%query%",
  QUERY_PARAMS: {
    MOVIES: "&ttype=ft",
    TV: "&ttype=tv",
    TV_EPISODE: "&ttype=ep"
  },
  RESULTS_QUERY_SELECTORS: {
    RESULT: "tr.findResult",
    RESULT_YEAR: ".result_text",
    RESULT_NAME: ".result_text a",
    RESULT_URL: ".result_text a",
    RESULT_POSTER_URL: ".primary_photo img"
  },
  ID_REGEX: /tt\d{7,8}/,
  YEAR_REGEX: /\(\d{4}\)/gm,
  DETAIL_PAGE: "https://www.imdb.com/title/%imdb_id%",
  EPISODE_LIST: "/episodes",
  TV_SHOW_QUERY_SELECTORS: {
    SEASONS: "select#bySeason option",
    SINGLE_EPISODE: ".eplist .list_item",
    EPISODE_NAME: "a",
    AIRDATE: ".airdate"
  },
  DEFAULT_OPTIONS: {
    port: 5000,
    routesPrefix: "/api/imdb",
    routes: {
      queryImdb: "/search",
      getSeasons: "/tv/seasons",
      getAllEpisodes: "/tv/episodes/all",
      getEpisodesForSeason: "/tv/episodes/season",
      getMostRecentEpisode: "/tv/episodes/latest",
      getAllReleasedEpisodes: "/tv/episodes/released",
      getUpcomingEpisode: "/tv/episodes/upcoming"
    }
  }
};

module.exports = constants;
