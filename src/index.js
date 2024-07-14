#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import createDirectoryContents from "./createDirectoryContents.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CURR_DIR = process.cwd();

const nicheChoices = [
  {
    name: "Litres to Gallons",
    value: "liters-to-gallons",
  },
  {
    name : "Markdown to Sheets",
    value : "markdown-to-sheets"
  },
  {
    name : "MRR",
    value : "mrr"
  },
  {
    name : "Password Generator",
    value : "password-generator"
  },
  {
    name : "Paypal Fee Calculator",
    value : "paypal-fee-calculator"
  },
  {
    name : "Phone Number Generator",
    value : "phone-number-generator"
  },
];

const questions = [
  {
    name: "nichetools",
    type: "list",
    message: "Choose your niche tool",
    choices: nicheChoices,
  },
];

async function main() {
  try {
    const answers = await inquirer.prompt(questions);
    const { nichetools } = answers;
    const templateName = `${nichetools}`;
    const templatePath = join(__dirname, "./templates", templateName);

    // Copy the contents from the template directory to the current directory
    await createDirectoryContents(templatePath, CURR_DIR);

    console.log(
      chalk.green("Scaffolding project in ") + chalk.blue(`${CURR_DIR}...`)
    );
  
  } catch (error) {
    console.error(
      chalk.red("Error occurred during project scaffolding:"),
      error
    );
  }
}

main();
