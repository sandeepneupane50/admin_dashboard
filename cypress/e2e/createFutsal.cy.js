describe('template spec', () => {
    it('passes', () => {
      cy.visit('/')
      cy.intercept('http://localhost:8003/login', {
        fixture: 'login.json'
      }).as('login')
      cy.get('#email').type('admin@gmail.com')
      cy.get('#password').type('admin')
  
      // submit the form 
      cy.get('button').contains('Login').click()
      cy.wait('@login')
      cy.get('#create_futsals').contains('Futsals').click()
      cy.get('button').contains('Add New').click()
    })
  })