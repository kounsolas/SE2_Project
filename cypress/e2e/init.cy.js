describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    })
})

it('GET /search', () => {
    cy.visit("http://localhost:8080/docs/#/search/searchGET");
    cy.get("button.btn.try-out__btn").click();
    cy.get("button.btn.execute.opblock-control__btn").click();
  
    // Extract and process the response text
    cy.get("pre.microlight").invoke("text").then((responseText) => {
      // Split the response by any known separator (if applicable)
      // cy.log(responseText);
      const responses = responseText.split('][').map((res) => {
        return res.replace(/[\[\]]/g, '').trim(); // Remove brackets and whitespace
      });
      // cy.log(responses[0])
  
      // Parse and validate the first response
      const parsedResponse = JSON.parse(`[${responses[0]}]`); // Wrap with brackets
      cy.log(parsedResponse)
      expect(parsedResponse).to.deep.equal([
        {
          address: "Leoforou Stratou 34",
          restaurantName: "Mamalouka",
        },
        {
          address: "Tsimiski 20",
          restaurantName: "Estrella",
        },
      ]);
    });
  });
  

it('POST /payBookingFee', () =>{
    cy.visit('http://localhost:8080/docs/#/payment/payBookingFee');
    cy.get('button.btn.try-out__btn').click();
    const paymentData = `{
    "cardHolderName": "John Doe",
    "cardNumber": "9876543210987654",
    "CVC": 456,
    "expirationDate": "12/2028"
    }`;
    cy.get('textarea.body-param__text')
    .clear()
    .type(paymentData, {parseSpecialCharSequences: false});

    cy.get('button.btn.execute.opblock-control__btn').click();
    // cy.get('pre.microlight').then((element) => {
    //     cy.log(element.text());
    // });
    cy.get("pre.microlight").invoke("text").then((responseText) => {
        // Split the response by any known separator (if applicable)
        // cy.log(responseText);
        const responses = responseText.split('][').map((res) => {
          return res.replace(/[\[\]]/g, '').trim(); // Remove brackets and whitespace
        });
        // cy.log(responses[0])
    
        // Parse and validate the first response
        const parsedResponse = JSON.parse(`[${responses[0]}]`); // Wrap with brackets
        cy.log(parsedResponse)
        expect(parsedResponse).to.deep.equal([
          {
            "success": true
          }
        ]);
      });

});
