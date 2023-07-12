import React from 'react'
import SelectedCity from './SelectCity'
import { locationUrl } from 'src/util/apiroutes'

describe('<SelectedCity />', () => {
  it('renders', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.intercept(`${locationUrl}/cities?districtId=1`, {
      fixture: 'cities'
    }).as('cities');
    cy.mount(<SelectedCity onChange={onChangeSpy} selectedDistrict={'1'}  />) 
    cy.get('select').select('Balaju').should('have.value', '1')
  })
})