import React from 'react'
import SelectedDistrict from './SelectDistrict'
import { locationUrl } from 'src/util/apiroutes'

describe('<SelectedProvince />', () => {
  it('renders', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(<SelectedDistrict onChange={onChangeSpy} selectedProvince={'1'}  />)
    cy.intercept(`${locationUrl}/districts`, {
      fixture: 'districts'
    }).as('districts') 
    cy.get('select').select('Kathmandu').should('have.value', '1')
  })
})