import React from 'react'
import FutsalCreate from './Create'

describe('<FutsalCreate />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FutsalCreate />)
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