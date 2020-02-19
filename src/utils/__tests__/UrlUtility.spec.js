import faker from "faker";
const UrlUtility = require("../UrlUtility");

describe("UrlUtility", () => {
  describe("buildEpisodeCode", () => {
    it("prepends '0' to numbers under 10", () => {
      // Assign
      const season = faker.random.number({ min: 1, max: 9 });
      const episode = faker.random.number({ min: 1, max: 9 });

      // Act
      const episodeCode = UrlUtility.buildEpisodeCode(season, episode);

      // Assert
      expect(episodeCode).toEqual(`S0${season}E0${episode}`);
    });
    it("does not prepend '0' to numbers of 10 or higher", () => {
      // Assign
      const season = faker.random.number({ min: 10 });
      const episode = faker.random.number({ min: 10 });

      // Act
      const episodeCode = UrlUtility.buildEpisodeCode(season, episode);

      // Assert
      expect(episodeCode).toEqual(`S${season}E${episode}`);
    });
    test.each`
      season                                     | episode
      ${faker.random.number({ min: 1, max: 9 })} | ${null}
      ${null}                                    | ${faker.random.number({ min: 1, max: 9 })}
    `(
      "throws ReferenceError when seasonNumber is $season and episdeNumber is $episode",
      ({ season, episode }) => {
        // Act & Assert
        expect(() => {
          UrlUtility.buildEpisodeCode(season, episode);
        }).toThrow(ReferenceError);
      }
    );
    it("throws ReferenceError when seasonNumber is not defined", () => {
      // Assign
      const episode = faker.random.number({ min: 1, max: 9 });

      // Act & Assert
      expect(() => {
        UrlUtility.buildEpisodeCode(null, episode);
      }).toThrow(ReferenceError);
    });
  });
});
