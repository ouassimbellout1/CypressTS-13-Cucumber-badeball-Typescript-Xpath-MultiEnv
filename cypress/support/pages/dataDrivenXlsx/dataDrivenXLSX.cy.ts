/// <reference types="cypress" />
import { common } from "../../common";

// Localisateurs
const pageLocators = {
    reduxHomePage      : `.navbar-brand`,
    reduxLoginPage     : `[href="#login"]`,
    inputReduxEmail    : `[type="email"]`,
    InputReduxPassword : `[type="password"]`,
    buttonSignIn       : `.btn`,
    errorMessageLogin  : `.error-messages > li`
}

// Variables
const pageVariables = {
    messageErrorlogin  : `email or password is invalid`
}

// Méthodes
class DataDriven {
    // Lecture du fichier Excel
    excelFileValidate(excelFileName: string) {
        cy.readFile(`cypress/fixtures/xlsx/${excelFileName}.xlsx`);
    }

    // Se connecter par fichier Excel
    xlsxLogin(fileName: string, sheetName: string) {
        cy.taskExcel(fileName, sheetName).then(
            (user: any) => {
                let rowsLength = user.length;
                for (let i = 0;  i < rowsLength; i++) {
                    cy.input(pageLocators.inputReduxEmail, user[i].email);
                    cy.input(pageLocators.InputReduxPassword, user[i].password);
                    cy.push(pageLocators.buttonSignIn);
                    cy.textCompare(pageLocators.errorMessageLogin, pageVariables.messageErrorlogin)
                }
            }
        )
    }

    // Se connecter par fichier Json
    jsonLogin(fileName: string, sheetName: string) {
        cy.taskExcel(fileName, sheetName).then(
            (user: any) => { 
                let rowsLength = user.length;
                cy.excelToJson(user, fileName);
                cy.fixture(`Json/${fileName}.json`).then((data) => {   
                    for (let i = 0;  i < rowsLength; i++) {
                        cy.input(pageLocators.inputReduxEmail, data.user[i].email);
                        cy.input(pageLocators.InputReduxPassword, data.user[i].password);
                        cy.push(pageLocators.buttonSignIn);
                        cy.textCompare(pageLocators.errorMessageLogin, pageVariables.messageErrorlogin);
                    }
                })
            }
        )
    }

    // Se connecter par table de donner
    loginWithTable(Email: any, Password: any) {
        cy.input(pageLocators.inputReduxEmail, Email);
        cy.input(pageLocators.InputReduxPassword, Password);
        cy.push(pageLocators.buttonSignIn);
        cy.textCompare(pageLocators.errorMessageLogin, pageVariables.messageErrorlogin)
    }

    // Se connecter avec une seule ligne choisi au hasard de la table de donner
    loginWithRandomTable(data) {
        const login = common.dataRandom(data);
        cy.logDescription('La ligne choisi est la ligne: ' + login[0])
        cy.input(pageLocators.inputReduxEmail, login[1]);
        cy.input(pageLocators.InputReduxPassword, login[2]);
        cy.push(pageLocators.buttonSignIn);
        cy.textCompare(pageLocators.errorMessageLogin, pageVariables.messageErrorlogin);
    }

    // Atteindre à la page login de Redux
    reduxLoginPage() {
        cy.navigateToPage(pageLocators.reduxLoginPage);
    }

    // Retour à la page d'accueil Redux
    reduxHomePage() {
        cy.navigateToPage(pageLocators.reduxHomePage);
    }

}

export default new DataDriven();