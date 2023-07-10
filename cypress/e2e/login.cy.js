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
    cy.wait('@login').its('response.body.accessToken').should('eq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY4NzkzNjU5MywiZXhwIjoxNjg3OTQwMTkzLCJzdWIiOiIyIn0.b59ai2W65uhr28k3zj4ErLnanGqE0dTH7cJXGbrQ6s8')
    cy.get('#dashboard').contains('FUTSAL BOOKING')
  })
})