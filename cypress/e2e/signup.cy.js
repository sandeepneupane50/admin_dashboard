
describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('button').contains('Sign Up!').click()
    cy.intercept('POST', 'http://localhost:8003/users', {
      fixture: 'register.json'
    }).as('Register')
     // Fill in the registration form fields
     cy.get('#username').type('gacukomasa');
     cy.get('#email').type('dapez@mailinator.com');
     cy.get('#password').type('Pa$$w0rd!');
     cy.get('#confirmPassword').type('Pa$$w0rd!');
    //  cy.get('button').contains('Create Account').click()
     cy.get('form').submit()
     cy.wait('@Register')
     cy.visit('/')

     cy.intercept('http://localhost:8003/login', {
      fixture: 'login.json'
    }).as('login')
    cy.get('#email').type('dapez@mailinator.com')
    cy.get('#password').type('Pa$$w0rd!')

    // submit the form 
    cy.get('button').contains('Login').click()
    cy.wait('@login')
    cy.get('#dashboard').contains('FUTSAL BOOKING')
  })
})