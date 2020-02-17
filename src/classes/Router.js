const ImdbUtility = require("../utils/ImdbUtility");

class Router {
  constructor() {}

  loadRoutes(router, routes) {
    router.post(routes.queryImdb, async ({ body }, res) => {
      const { query, type } = body;
      res.send(await ImdbUtility.queryImdb(query, type));
    });

    router.post(routes.getSeasons, async ({ body }, res) => {
      const { imdbId } = body;
      res.send(await ImdbUtility.getSeasons(imdbId));
    });

    /**
     * Gets a list of all known episodes for this TV Show
     */
    router.post(routes.getAllEpisodes, async ({ body }, res) => {
      const { imdbId } = body;
      res.send(await ImdbUtility.getAllEpisodes(imdbId));
    });

    /**
     * Gets a list of all episodes for the given season of TV Show
     */
    router.post(routes.getEpisodesForSeason, async ({ body }, res) => {
      const { imdbId, season } = body;
      res.send(await ImdbUtility.getEpisodesForSeason(imdbId, season));
    });

    /**
     * Gets the most recently aired episode for this TV Show
     */
    router.post(routes.getMostRecentEpisode, async ({ body }, res) => {
      const { imdbId } = body;
      res.send(await ImdbUtility.getMostRecentEpisode(imdbId));
    });

    /**
     * Gets all released episodes for a TV SHow
     */
    router.post(routes.getAllReleasedEpisodes, async ({ body }, res) => {
      const { imdbId } = body;
      res.send(await ImdbUtility.getAllReleasedEpisodes(imdbId));
    });

    /**
     * Gets the upcoming episode for this TV Show (if any are found)
     */
    router.post(routes.getUpcomingEpisode, async ({ body }, res) => {
      const { imdbId } = body;
      res.send(await ImdbUtility.getUpcomingEpisode(imdbId));
    });
  }
}

module.exports = Router;
