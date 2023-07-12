import React from 'react'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginForm names={'admin@gmail.com'}/>)
    cy.get('input#email').should('have.value', 'admin@gmail.com')
  })
})