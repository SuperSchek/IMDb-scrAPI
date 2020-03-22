const puppeteer = require("puppeteer");
const _orderBy = require("lodash/orderBy");
const constants = require("../constants");
const PuppeteerUtility = require("./PuppeteerUtility");
const UrlUtility = require("./UrlUtility");

module.exports = class ImdbUtility {
  /**
   * Crawls
   *
   * @param {string} query
   */
  static async queryImdb(query, type = null) {
    const url = UrlUtility.buildImdbQuery(query, type);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const results = await page.$$("tr.findResult");
    const response = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const name = await PuppeteerUtility.getPropertyValue(
        result,
        constants.RESULTS_QUERY_SELECTORS.RESULT_NAME
      );
      const url = await PuppeteerUtility.getPropertyValue(
        result,
        constants.RESULTS_QUERY_SELECTORS.RESULT_NAME,
        "href"
      );
      const poster = await PuppeteerUtility.getPropertyValue(
        result,
        constants.RESULTS_QUERY_SELECTORS.RESULT_POSTER_URL,
        "src"
      );
      const year = await PuppeteerUtility.getPropertyValue(
        result,
        constants.RESULTS_QUERY_SELECTORS.RESULT_YEAR
      );

      response.push({
        name,
        year: ImdbUtility.extractYearFromTitle(year),
        url,
        poster,
        imdbId: ImdbUtility.extractImdbId(url)
      });
    }

    await browser.close();
    return response;
  }

  /**
   * Extracts IMDB Id from a url
   * @public
   *
   * @param {string} url
   *
   * @returns {string}
   */
  static extractImdbId(url) {
    try {
      return constants.ID_REGEX.exec(url)[0];
    } catch {
      throw new ReferenceError(
        `Regex ${constants.ID_REGEX} did not return any results from ${url}`
      );
    }
  }

  static extractYearFromTitle(title) {
    try {
      const regexResult = constants.YEAR_REGEX.exec(title);
      return regexResult ? regexResult[0] : null;
    } catch {
      throw new ReferenceError(
        `Regex ${constants.YEAR_REGEX} did not return any results from ${title}`
      );
    }
  }

  static async getSeasons(imdbId) {
    const url =
      constants.DETAIL_PAGE.replace("%imdb_id%", imdbId) +
      constants.EPISODE_LIST;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const seasons = await page.$$(constants.TV_SHOW_QUERY_SELECTORS.SEASONS);

    const foundSeasons = [];

    for (let i = 0; i < seasons.length; i++) {
      const season = seasons[i];
      const value = await (await season.getProperty("value")).jsonValue();

      if (value > 0) {
        foundSeasons.push(value);
      }
    }

    await browser.close();

    return foundSeasons;
  }

  /**
   * Get all episodes for a specific season
   *
   * @param {string} imdbId
   * @param {number} season
   */
  static async getEpisodesForSeason(imdbId, season) {
    const episodeData = [];
    const url =
      constants.DETAIL_PAGE.replace("%imdb_id%", imdbId) +
      constants.EPISODE_LIST +
      `?season=${season}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const episodes = await page.$$(
      constants.TV_SHOW_QUERY_SELECTORS.SINGLE_EPISODE
    );

    for (let i = 0; i < episodes.length; i++) {
      const episode = episodes[i];

      const name = await PuppeteerUtility.getPropertyValue(
        episode,
        constants.TV_SHOW_QUERY_SELECTORS.EPISODE_NAME,
        "title"
      );
      const airdate = await PuppeteerUtility.getPropertyValue(
        episode,
        constants.TV_SHOW_QUERY_SELECTORS.AIRDATE
      );

      episodeData.push({
        name,
        episodeCode: UrlUtility.buildEpisodeCode(season, i + 1),
        airdate: ImdbUtility.dateFromString(airdate)
      });
    }

    await browser.close();
    return _orderBy(episodeData, function(episode) {
      return episode.airdate;
    });
  }

  static async getAllEpisodes(imdbId) {
    const episodes = [];
    const seasons = await ImdbUtility.getSeasons(imdbId);

    for (let i = 0; i < seasons.length; i++) {
      const season = seasons[i];
      const episodesForSeason = await ImdbUtility.getEpisodesForSeason(
        imdbId,
        season
      );

      episodesForSeason.filter(episode => episodes.push(episode));
    }

    return episodes;
  }

  /**
   *
   * @param {array} episodes
   */
  static async getMostRecentEpisode(imdbId) {
    const releasedEpisodes = await ImdbUtility.getAllReleasedEpisodes(imdbId);

    return releasedEpisodes[releasedEpisodes.length - 1];
  }

  static async getUpcomingEpisode(imdbId) {
    const allEpisodes = await ImdbUtility.getAllEpisodes(imdbId);
    const releasedEpisodes = await ImdbUtility.getAllReleasedEpisodes(
      imdbId,
      allEpisodes
    );

    return allEpisodes[releasedEpisodes.length];
  }

  static async getAllReleasedEpisodes(imdbId, episodes = null) {
    const now = new Date();
    const allEpisodes = episodes
      ? episodes
      : await ImdbUtility.getAllEpisodes(imdbId);

    return allEpisodes.filter(episode => {
      return episode.airdate < now && episode.airdate !== null;
    });
  }

  /**
   * Returns a Date based on the passed string
   *
   * @param {string} date
   */
  static dateFromString(date) {
    if (date.length < 9) {
      return null;
    } else {
      return new Date(date.replace(".", ""));
    }
  }
};
