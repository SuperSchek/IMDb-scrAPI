import faker from "faker";
const puppeteer = require("puppeteer");
const ImdbUtility = require("../ImdbUtility");
const UrlUtility = require("../UrlUtility");

jest.mock("../UrlUtility");

describe("PuppeteerUtility", () => {
  describe("getPropertyValue", () => {
    it.skip("url is built using the UrlUtility", async () => {
      const query = faker.lorem.words();

      ImdbUtility.queryImdb(query);
    });
    it.todo("throws ReferenceError when nothing is found with passed selector");
    it.todo("only takes an instance of ElementHandle as element");
  });
});
