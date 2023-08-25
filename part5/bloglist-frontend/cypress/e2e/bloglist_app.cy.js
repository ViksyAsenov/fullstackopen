describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Viktor Asenov',
      username: 'viksy',
      password: 'a12345'
    }
    const secondUser = {
      name: 'Admin Adminov',
      username: 'admin',
      password: 'a12345'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, secondUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  it('Login fails with wrong password', function() {
    cy.get('#username').type('viksy')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Viktor Asenov logged in')
  })

  it('Login succeeds with correct password', function () {
    cy.get('#username').type('viksy')
    cy.get('#password').type('a12345')
    cy.get('#login-button').click()

    cy.contains('Viktor Asenov logged in')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'viksy', password: 'a12345' })
    })

    it('A new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[placeholder="write title here"]').type('A test blog')
      cy.get('input[placeholder="write author here"]').type('Test Testov')
      cy.get('input[placeholder="write url here"]').type('www.test.com')
      cy.contains('create').click()

      cy.get('.success')
      .should('contain', 'a new blog \'A test blog\' by Test Testov has been added')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid')

      cy.contains('A test blog | Test Testov')
    })

    describe('And several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'First test blog', author: 'First Author', url: 'www.firsturl.com' })
        cy.createBlog({ title: 'Second test blog', author: 'Second Author', url: 'www.secondurl.com' })
        cy.createBlog({ title: 'Third test blog', author: 'Third Author', url: 'www.thirdurl.com' })
      })

      it('One of those can be made liked', function () {
        cy.contains('Second test blog').parent().find('#view-hide-button').click()
        cy.contains('Second test blog').parent().parent().as('secondBlog')
        cy.get('@secondBlog').find('#like-count').contains(0)
        cy.get('@secondBlog').find('#like-button').click()
        cy.get('@secondBlog').find('#like-count').contains(1)
      })

      it('And you can delete only the one you created', function() {
        cy.contains('Second test blog').parent().find('#view-hide-button').click()
        cy.contains('Second test blog').parent().parent().find('#delete-button').click()
        cy.get('html').should('not.contain', 'Second test blog')
      })

      it('And you cannot delete blogs you haven\'t created', function() {
        cy.contains('Viktor Asenov logged in').parent().find('#logout-button').click()
        cy.login({ username: 'admin', password: 'a12345' })

        cy.contains('Second test blog').parent().find('#view-hide-button').click()
        cy.contains('Second test blog').parent().parent().should('not.contain', '#delete-button')
      })

      it('And they are ordered by their number of likes', function() {
        cy.contains('First test blog').parent().find('#view-hide-button').click()
        cy.contains('First test blog').parent().parent().as('firstBlog')

        cy.contains('Second test blog').parent().find('#view-hide-button').click()
        cy.contains('Second test blog').parent().parent().as('secondBlog')

        cy.contains('Third test blog').parent().find('#view-hide-button').click()
        cy.contains('Third test blog').parent().parent().as('thirdBlog')

        for(let i = 0; i < 2; i++) {
          cy.get('@firstBlog').find('#like-button').click()
          cy.wait(500)
        }
        cy.contains('First test blog').parent().find('#view-hide-button').click()

        cy.get('@thirdBlog').find('#like-button').click()
        cy.wait(500)
        cy.contains('Third test blog').parent().find('#view-hide-button').click()

        for(let i = 0; i < 3; i++) {
          cy.get('@secondBlog').find('#like-button').click()
          cy.wait(500)
        }
        cy.contains('Second test blog').parent().find('#view-hide-button').click()

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('Second test blog')
          cy.wrap(blogs[1]).contains('First test blog')
          cy.wrap(blogs[2]).contains('Third test blog')
        })
      })
    })
  })
})