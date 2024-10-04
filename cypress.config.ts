const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const xlsx = require('xlsx');

module.exports = defineConfig({
  env: {
    local   : 'https://www.google.com/',
    google     : 'https://www.google.com/',
    redux   : `https://react-redux.realworld.io/`
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }));
      on("task", {
        generateJSONFromExcel: generateJSONFromExcel,
      });
      preprocessor.addCucumberPreprocessorPlugin(on, config);
      return config;
    },
	specPattern: "./cypress/e2e/**/*.feature",
  },
});

// Excel To JSON
function generateJSONFromExcel(agrs) {
  const wb   = xlsx.readFile(agrs.excelFilePath, { dateNF: "mm/dd/yyyy" });
  const ws   = wb.Sheets[agrs.sheetName];
  const read = xlsx.utils.sheet_to_json(ws, { raw: false });
  return read;
}