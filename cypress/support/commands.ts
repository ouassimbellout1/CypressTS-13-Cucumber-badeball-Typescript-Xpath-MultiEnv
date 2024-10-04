// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(`googleSearch`, (search: string) => {
    cy.xpath(`//textarea[@title]`)
        .should(`be.visible`)
        .type(`${search}{enter}`, { delay : 120 });
    cy.xpath(`//a[contains(.,'Vidéos')]`).click();
});

Cypress.Commands.add(`navigateToURL`, (url: string) => {
    cy.visit(Cypress.env(url));
});

Cypress.Commands.add(`navigateToPage`, (locatorHomePage: string) => {
    cy.get(locatorHomePage).click();
});

Cypress.Commands.add(`taskExcel`, (excelFileName: string, sheetName: string) => {
    const excelFilePath = `cypress/fixtures/xlsx/${excelFileName}.xlsx`;
    return cy.task("generateJSONFromExcel", { excelFilePath, sheetName })
});

Cypress.Commands.add(`excelToJson`, (user: string, jsonFileName: string) => {
    return cy.writeFile(`cypress/fixtures/Json/${jsonFileName}.json`, {user});
});

// Cypress.Commands.Log.Description
Cypress.Commands.add(`logDescription`, (description) => {
    cy.log(`**[${description}](http://example.com)**`);
});

// Cypress.Commands.Input.With.Mask
Cypress.Commands.add(`typeMask`, { prevSubject: true }, (subject, value: string) => {
    const input: HTMLInputElement = subject.get(0);
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
});

// Cypress.Commands.input
Cypress.Commands.add(`input`, (locator, text) => {
    cy.get(locator)
    .should('exist')
    .clear()
    .then(() => {
        cy.get(locator).typeMask(text);
    });
});

// Cypress.Commands.textCompare
Cypress.Commands.add(`textCompare`, (locator, text) => {
    cy.get(locator).then(function(e){
        const t = e.text();
        expect(t).to.contains(text);
    })
});

// Cypress.Commands.push
Cypress.Commands.add(`push`, (locator) => {
    cy.get(locator)
    .should('exist')
    .click();
});