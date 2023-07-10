import React from 'react'
import SelectedCity from './SelectCity'
import { locationUrl } from 'src/util/apiroutes'

describe('<SelectedCity />', () => {
  it('renders', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(<SelectedCity onChange={onChangeSpy} selectedDistrict={'1'}  />)
    cy.intercept(`${locationUrl}/cities`, {
      fixture: 'cities'
    }).as('cities') 
    cy.get('select').select('Balaju').should('have.value', '1')
  })
})