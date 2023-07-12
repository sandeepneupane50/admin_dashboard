import React from 'react'
import SelectedProvince from './SelectProvince'
import { locationUrl } from 'src/util/apiroutes'

describe('<SelectedProvince />', () => {
  it('renders', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.intercept(`${locationUrl}/provinces`, {
      fixture: 'provinces'
    }).as('provinces')
    cy.mount(<SelectedProvince onChange={onChangeSpy} />)
    cy.get('select').select('Bagmati').should('have.value', '1')
  })
})