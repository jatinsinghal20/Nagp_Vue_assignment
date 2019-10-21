// https://docs.cypress.io/api/introduction/api.html

describe('Write New Article', () => {
  it('Write New Article', () => {
    cy.visit('/login')
    cy.contains('h2', 'Sign In')
    cy.get('#email').type('jatinsinghal20@gmail.com');
    cy.get('#text-password').type('jatinsinghal');
    cy.get('.btn').click();
    cy.wait(500);
    cy.contains('.nav-link','My Timeline');
    cy.get('#newArticle').click();
    cy.get('#title').type("title");
    cy.get("#description").type("desc");
    cy.get("#exampleFormControlTextarea1").type("Content");
    cy.get('.btn').click()
    cy.wait(500);
    cy.contains('h4','title');
  })
})


describe('Add Comments to Article', () => {
  it('Write New Article', () => {
    cy.visit('/login')
    cy.contains('h2', 'Sign In')
    cy.get('#email').type('jatinsinghal20@gmail.com');
    cy.get('#text-password').type('jatinsinghal');
    cy.get('.btn').click();
    cy.wait(500);
    cy.contains('.nav-link','My Timeline');
    cy.get('#newArticle').click();
    cy.get('#title').type("title");
    cy.get("#description").type("desc");
    cy.get("#exampleFormControlTextarea1").type("Content");
    cy.get('.btn').click()
    cy.wait(500);
    cy.contains('h4','title');
    cy.get('.form-control').type("New Comment");
    cy.get('.col-4 > .btn').click();
    cy.contains('.col-12',"New Comment");
  })
})
