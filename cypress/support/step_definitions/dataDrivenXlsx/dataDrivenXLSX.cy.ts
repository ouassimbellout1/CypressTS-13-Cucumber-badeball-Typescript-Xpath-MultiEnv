/// <reference types="cypress" />

import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import dataDriven from "../../../support/pages/dataDrivenXlsx/dataDrivenXLSX.cy";

//***************************************************************************************** */
// When :

When(`J'accède à la page login`, () => {
    dataDriven.reduxLoginPage();
});

When(`Je m'assure que le fichier excel est prèt`, () => {
    dataDriven.excelFileValidate(`login`);
});

//**************************************************************************************** */
// Then :

Then(`J'utilise {string} pour se connecter`, (contexte, data: DataTable) => { 
    switch (contexte) {
        case 'XLSX':
            dataDriven.xlsxLogin(`login`, `invalid-users`);
        return;
    
        case 'Json':
            dataDriven.jsonLogin(`login`, `invalid-users`);
        return;

        case 'table':
            data.hashes().forEach(element => {
                dataDriven.loginWithTable(element.email, element.password);
            });
        return;
        case 'table Random':
            dataDriven.loginWithRandomTable(data);
        return;
    } 
});

Then(`J'utiliser table pour se connecter with {string} and {string}`, (email, password) => {   
    dataDriven.loginWithTable(email, password) 
});

Then(`Je retourne à la page d'accueil redux`, () => {
    dataDriven.reduxHomePage();
});