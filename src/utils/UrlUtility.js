const constants = require("../constants");

class UrlUtility {
  /**
   * Takes a query and returns the IMDB url for it
   * @static
   *
   * @param {string} query
   * @param {string} type - "movies", "tv" or "episode"
   */
  static buildImdbQuery(query, type) {
    const encodedQuery = encodeURIComponent(query);
    let url = constants.QUERY_URL;
    url = url.replace("%query%", encodedQuery);

    switch (type) {
      case "movies":
        url = url + constants.QUERY_PARAMS.MOVIES;
        break;
      case "tv":
        url = url + constants.QUERY_PARAMS.TV;
        break;
      case "episode":
        url = url + constants.QUERY_PARAMS.TV_EPISODE;
        break;
    }

    return url;
  }

  static buildEpisodeCode(seasonNumber, episodeNumber) {
    if (seasonNumber == null || episodeNumber == null) {
      throw new ReferenceError(
        "Both seasonNumber and episodeNumber have to be defined to be able to build an episodeCode"
      );
    } else {
      return `S${seasonNumber < 10 ? "0" + seasonNumber : seasonNumber}E${
        episodeNumber < 10 ? "0" + episodeNumber : episodeNumber
      }`;
    }
  }
}

module.exports = UrlUtility;
