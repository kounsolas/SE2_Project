describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    })
})

it('GET /search', () => {
    cy.visit("http://localhost:8080/docs/#/search/searchGET");
    cy.get("button.btn.try-out__btn").click();
    cy.get('button.btn.execute.opblock-control__btn').click();
    //cy.contains()
})
