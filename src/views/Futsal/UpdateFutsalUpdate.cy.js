import React from 'react'
import FutsalUpdate from './Update'
import { locationUrl } from 'src/util/apiroutes'
import { addFusal } from 'src/util/apiroutes'

describe('<FutsalUpdate />', () => {

  it('renders', () => {
    
    const id = 1;
    cy.intercept(`${addFusal}/details?id=1`, {
      fixture:'futsaldetail'
    }).as('futsaldetail')
    cy.intercept(`${locationUrl}/provinces`, {
      fixture: 'provinces'
    }).as('provinces');
    cy.intercept(`${locationUrl}/districts?provinceId=1`, {
      fixture: 'districts'
    }).as('districts');
    cy.intercept(`${locationUrl}/cities?districtId=1`, {
      fixture: 'cities'
    }).as('cities');
    cy.mountWithParams(<FutsalUpdate />, `/futsals/${id}/edit`, `/futsals/:id/edit`)

    cy.get('#futsal').should('have.value','Blaze Dixon');
    cy.get('#owner').should('have.value','Lani Henson');
    cy.get('#email').should('have.value','ryfuxo@mailinator.com');
    cy.get('#contact').should('have.value','6509090909');
    cy.get('#province').select('Bagmati').should('have.value', '1');
    cy.get('#district').select('Kathmandu').should('have.value', '1');
    cy.get('#city').select('Balaju').should('have.value', '1');
    cy.get('#street').should('have.value','Numquam tempora rem ');
    cy.get('#pan').should('have.value','00990');
    // cy.get('#file').should('have.value','C:\\fakepath\\test.js');
    cy.get('#openingTime').should('have.value','09:00');
    cy.get('#closingTime').should('have.value','21:00');
    cy.get('#ground').should('have.value','1');
    cy.get('#status').check('1');
  })
})