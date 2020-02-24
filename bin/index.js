#!/usr/bin/env node
const yargs = require("yargs");
const Application = require("../src/classes/Application");

yargs
    .command(
        "serve",
        "Start serving the API",
        yargs => {
            return yargs.option("port", {
                describe: "The port the application will listen to",
                alias: "p",
                type: "number"
            });
        },
        yargs => {
            new Application().serve(yargs);
        }
    )
    .help().argv;