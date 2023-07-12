import React from 'react'
import BookingForm from './Form'
import { locationUrl } from 'src/util/apiroutes'
import { addFusal, bookFutsal } from 'src/util/apiroutes'

describe('<BookingForm />', () => {
  it('renders', () => {
    
    cy.intercept(`${locationUrl}/provinces`, {
      fixture: 'provinces'
    }).as('provinces');
    cy.intercept(`${locationUrl}/districts?provinceId=1`, {
      fixture: 'districts'
    }).as('districts');
    cy.intercept(`${locationUrl}/cities?districtId=1`, {
      fixture: 'cities'
    }).as('cities');
    cy.intercept(`${addFusal}/details?city=1&status=1`, {
      fixture:'futsaldetail'
    }).as('futsaldetail');
    cy.intercept(`${addFusal}/details?id=1`, {
      fixture:'futsaldetail'
    }).as('slots')
    cy.intercept(`${bookFutsal}/books?futsal=1&bookdate='2000-03-03'`, {
      fixture:'books'
    }).as('booked slots')
    cy.mount(<BookingForm />)
    cy.get('#client').type('APF FC');
    cy.get('#contact').type('9876543102');
    cy.get('#province').select('Bagmati').should('have.value', '1');
    cy.get('#district').select('Kathmandu').should('have.value', '1');
    cy.get('#city').select('Balaju').should('have.value', '1');
    cy.get('#futsal').select('Blaze Dixon').should('have.value', '1');
    cy.get('#bookDate').type('2000-03-03');
    cy.get('#react-select-2-input').click().get('#react-select-2-listbox').first().click();
    cy.get('#ground').type('2');
    cy.get('#payment').select('Handcash');
    cy.get('#status').check('1');
  })
})