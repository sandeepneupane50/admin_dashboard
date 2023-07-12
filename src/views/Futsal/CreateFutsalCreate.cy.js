import React from 'react'
import FutsalCreate from './Create'
import { locationUrl } from 'src/util/apiroutes'

describe('<FutsalCreate />', () => {
  it('renders', () => {
    cy.mount(<FutsalCreate />)
    cy.intercept(`${locationUrl}/provinces`, {
      fixture: 'provinces'
    }).as('provinces');
    cy.intercept(`${locationUrl}/districts?provinceId=1`, {
      fixture: 'districts'
    }).as('districts');
    cy.intercept(`${locationUrl}/cities?districtId=1`, {
      fixture: 'cities'
    }).as('cities');
    cy.get('#futsal').type('Abc Futsal');
    cy.get('#owner').type('Ram Lal Thapa');
    cy.get('#email').type('abc@gmail.com');
    cy.get('#contact').type('9812345670');
    cy.get('#province').select('Bagmati').should('have.value', '1');
    cy.get('#district').select('Kathmandu').should('have.value', '1');
    cy.get('#city').select('Balaju').should('have.value', '1');
    cy.get('#street').type('Baneshwor');
    cy.get('#pan').type('23432');
    cy.get('#file').selectFile('san.jpeg');
    cy.get('#openingTime').type('09:00');
    cy.get('#closingTime').type('21:00');
    cy.get('#ground').type('2');
    cy.get('#status').check('1');
  })
})