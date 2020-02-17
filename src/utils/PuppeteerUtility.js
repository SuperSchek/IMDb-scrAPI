const puppeteer = require("puppeteer");

module.exports = class PuppeteerUtility {
  /**
   * Get a property value for an element
   * @public
   *
   * @param {ElementHandle} element
   * @param {string} [selector='innerText']
   *
   * @returns {string}
   */
  static async getPropertyValue(element, selector, property = "innerText") {
    try {
      return await (
        await (await element.$(selector)).getProperty(property)
      ).jsonValue();
    } catch {
      throw new Error(`Can't find anything with selector: ${selector}`);
    }
  }
};
