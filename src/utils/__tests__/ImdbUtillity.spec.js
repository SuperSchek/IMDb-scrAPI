import faker from "faker"
const ImdbUtillity = require("../ImdbUtility")

describe("ImdbUtillity", () => {
    describe("dateFromString", () => {
        it("returns null when a string shorter then 9 characters is passed", () => {
            // Arrange
            const date = faker.date.future()
            const year = JSON.stringify(date.getFullYear())

            // Act
            const result = ImdbUtillity.dateFromString(year)

            // Assert
            expect(result).toBe(null)
        });
        it("returns a Date object when proper string is passed", () => {
            // Assign
            const date = faker.date.future()
            const month = new Intl.DateTimeFormat('en-GB', { month: "short" }).format(date)
            const dateString = `${date.getDate()} ${month}. ${date.getFullYear()}`

            // Act
            const result = ImdbUtillity.dateFromString(dateString)

            // Assert
            expect(result.getDate()).toBe(date.getDate())
            expect(result.getMonth()).toBe(date.getMonth())
            expect(result.getFullYear()).toBe(date.getFullYear())
        });
    });
});