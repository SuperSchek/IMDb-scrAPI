# IMDb scrAPI

[![Build
Status](https://travis-ci.org/SuperSchek/IMDb-scrAPI.svg?branch=master)](https://travis-ci.org/SuperSchek/IMDb-scrAPI)

##### A minimal API for getting data off of IMDb using [Puppeteer](https://github.com/puppeteer/puppeteer/).

Can be served from the CLI or integrated into an existing `node` application.

I created this application because of a use case where I wanted to be able to get movie/tv related information periodically without needing an API key. This solution is slow, but suits my needs.

### Endpoints

| Method | Endpoint                | Body                                                                                 | Function                 | Description                                                                                                                                    |
| :----- | :---------------------- | :----------------------------------------------------------------------------------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/search`               | `query`: `string` (required) <br> `type`: `"movies"`, `"tv"`, `"episode"` (optional) | `queryImdb`              | Executes a search query on IMDb and returns the results it gets.                                                                               |
| `POST` | `/tv/seasons`           | `imdbId`: `string` (required)                                                        | `getSeasons`             | Returns an array with a number for each season it can find on IMDb. Will throw an error when the passed `idmbId` does not belong to a TV Show. |
| `POST` | `/tv/episodes/all`      | `imdbId`: `string` (required)                                                        | `getAllEpisodes`         | Gets a list of all known episodes for this TV Show                                                                                             |
| `POST` | `/tv/episodes/season`   | `imdbId`: `string` (required) <br> `season`: `number` (required)                     | `getEpisodesForSeason`   | Gets a list of all episodes for the given season of TV Show                                                                                    |
| `POST` | `/tv/episodes/latest`   | `imdbId`: `string` (required)                                                        | `getMostRecentEpisode`   | Gets the most recently aired episode for this TV Show                                                                                          |
| `POST` | `/tv/episodes/released` | `imdbId`: `string` (required)                                                        | `getAllReleasedEpisodes` | Gets all released episodes for a TV SHow                                                                                                       |
| `POST` | `/tv/episodes/upcoming` | `imdbId`: `string` (required)                                                        | `getUpcomingEpisode`     | Gets the upcoming episode for this TV Show (if any are found)                                                                                  |

### CLI

#### Installation

**NPM:**

```cli
npm i -g imdb-scrapi
```

**Yarn:**

```cli
yarn add -g imdb-scrapi
```

#### Usage

**Serve the API**

```cli
imdb-scrapi serve
```

**Options**
Options set as CLI arguments will take precedent over options specified in the `config.json`.
| Option | Description | Type | Default |
| ------------- |------------- | -----: | -----: |
| `--port, -p` | The port the application will listen to | number | `5000` |

### As a module

#### Installation

**NPM:**

```cli
npm i imdb-scrapi
```

**Yarn:**

```cli
yarn add imdb-scrapi
```

**Implement in your own project**

The following [methods](#Endpoints) are available for you to bind to your own routes or use elsewhere in your project.
