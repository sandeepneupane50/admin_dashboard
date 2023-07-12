import React from 'react'
import SelectedDistrict from './SelectDistrict'
import { locationUrl } from 'src/util/apiroutes'

describe('<SelectedProvince />', () => {
  it('renders', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.intercept(`${locationUrl}/districts?provinceId=1`, {
      fixture: 'districts'
    }).as('districts');
    cy.mount(<SelectedDistrict onChange={onChangeSpy} selectedProvince={'1'}  />)
    cy.get('select').select('Kathmandu').should('have.value', '1')
  })
})