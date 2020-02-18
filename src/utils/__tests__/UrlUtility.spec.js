import faker from "faker";
const UrlUtility = require("../UrlUtility");

describe("UrlUtility", () => {
  describe("buildEpisodeCode", () => {
    it("Prepends '0' to numbers under 10", () => {
      // Assign
      const season = faker.random.number({ max: 10 });
      const episode = faker.random.number({ max: 10 });

      // Act
      const episodeCode = UrlUtility.buildEpisodeCode(season, episode);

      // Assert
      expect(episodeCode).toEqual(`S0${season}E0${episode}`);
    });
  });
});
