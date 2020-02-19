import faker from "faker";
const constants = require("../../constants");
const UrlUtility = require("../UrlUtility");

jest.mock("../../constants");

describe("UrlUtility", () => {
  describe("buildImdbQuery", () => {
    it("the passed query is encoded to a URIComponent before being appended", () => {
      // Assign
      const query = faker.lorem.words();

      // Act
      const url = UrlUtility.buildImdbQuery(query);

      // Assert
      expect(url).toContain(encodeURIComponent(query));
    });
    it.each`
      query                  | type
      ${faker.lorem.words()} | ${null}
      ${faker.lorem.words()} | ${"movies"}
      ${faker.lorem.words()} | ${"tv"}
      ${faker.lorem.words()} | ${"episode"}
    `(
      `makes sure ${constants.QUERY_PLACEHOLDER} is removed from url when query is $query and type is $type`,
      ({ query, type }) => {
        // Act
        const url = UrlUtility.buildImdbQuery(query, type);

        // Assert
        expect(url).not.toContain(constants.QUERY_PLACEHOLDER);
      }
    );
  });
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
    it.each`
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
