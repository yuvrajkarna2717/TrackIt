#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

// Add commands
yargs(hideBin(process.argv))
  .command(require("../src/commands/add.js"))
  .command(require("../src/commands/view.js"))
  .command(require("../src/commands/delete.js"))
  .command(require("../src/commands/complete.js"))
  .command(require("../src/commands/export.js"))
  .demandCommand(1, "Please provide valid command.")
  .help()
  .alias("h", "help").argv;
