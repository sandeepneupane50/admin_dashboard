import React from 'react'
import BookingEdit from './Edit'
import { locationUrl } from 'src/util/apiroutes'
import { addFusal, bookFutsal } from 'src/util/apiroutes'

describe('<BookingEdit />', () => {
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
      fixture: 'futsaldetail'
    }).as('futsaldetail');
    cy.intercept(`${addFusal}/details?id=1`, {
      fixture: 'futsaldetail'
    }).as('slots')
    cy.intercept(`${bookFutsal}/books?futsal=1&bookdate='2000-03-03'`, {
      fixture: 'books'
    }).as('booked slots')

    const id = 1;
    cy.mountWithParams(<BookingEdit />, `/bookings/${id}/edit`, `/bookings/:id/edit`)
    cy.get('#client').should('have.value', 'APF FC');
    cy.get('#contact').should('have.value', '9876543102');
    cy.get('#province').select('Bagmati').should('have.value', '1');
    cy.get('#district').select('Kathmandu').should('have.value', '1');
    cy.get('#city').select('Balaju').should('have.value', '1');
    cy.get('#futsal').select('Blaze Dixon').should('have.value', '1');
    cy.get('#bookDate').should('have.value', '2000-03-03');
    cy.get('#timeSlots').select('10:00-11:00');
    cy.get('#ground').should('have.value', '2');
    cy.get('#payment').select('Handcash');
    cy.get('#status').check('1');
  })
})