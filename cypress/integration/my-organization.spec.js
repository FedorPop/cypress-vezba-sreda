/// <reference types='cypress'/>
import { newBoard } from "../pageObject/board";
import { loginPage } from "../pageObject/login"
import { myOrganizations } from "../pageObject/my-organizations";

describe('my-organizations', ()=>{

    let organizationId;
    let organizationName;

    before('login', ()=>{
        
        cy.visit('/login')
        loginPage.login('zxcv@zxcv.com', 'zxcvzxcvzxcv123');
    })

    xit('visit page', ()=>{
        
        cy.get('h2').should('be.visible');
        
    })

    it('create organization', ()=>{
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/organizations' 
        }).as('orgIntercept');

        myOrganizations.createOrganization('nova11');

        cy.wait('@orgIntercept').then((intercept)=>{
            expect(intercept.response.statusCode).eq(201);
            organizationId = intercept.response.body.id;
            organizationName = intercept.response.body.name;
            cy.visit('my-organizations')
            cy.get('.organization-list-item').eq(-1).should('contain', organizationName)
            cy.visit(`/organizations/${organizationId}/boards`);
            cy.get('li[data-cy="organization-boards"]').should('be.visible');
        })
    })

    xit('delete ogranization', ()=>{
        cy.get('.organization-list-item').eq(0).click();
        myOrganizations.modalConfirmBtn.click();
        cy.get('li[data-cy="organization-configuration"]').click();
        cy.get('.vs-c-btn--warning').click();
        cy.get(':password').type('zxcvzxcvzxcv123');
        cy.get('[name="save-btn"]').click();

        //myOrganizations.deleteOrganization('password123')
    })

    

})