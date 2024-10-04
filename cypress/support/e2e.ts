// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath');

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
    namespace Cypress {
        interface Chainable <Subject = any> {
            googleSearch(search: string): void;
            navigateToURL(url: string): void;
            navigateToPage(locatorHomePage: string): void;
            taskExcel(excelFileName: string, sheetName: string): any;
            excelToJson(excelFileName: string, sheetName: string): any;
            logDescription(description: string): void;
            typeMask(value: string): void;
            input(locator: string, text: string): void;
            textCompare(locator: string, text: string): void;
            push(locator: string): void;
        }
    }
}