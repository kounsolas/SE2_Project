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
    cy.get("pre.microlight").invoke("text").then(async (responseText) => {
      // Split the response by any known separator (if applicable)
      // cy.log(responseText);
      const responses = await responseText.split('][').map((res) => {
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
  
it('POST /payBookingFee', () => {
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
    .type(paymentData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then(async (responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = await JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

      expect(parsedResponse).to.deep.equal({
        success: true,
      });
    });
});

it('POST /payBookingFee Wrong CVC', () => {
  cy.visit('http://localhost:8080/docs/#/payment/payBookingFee');
  cy.get('button.btn.try-out__btn').click();
  const paymentData = `{
    "cardHolderName": "John Doe",
    "cardNumber": "9876543210987654",
    "CVC": 4569,
    "expirationDate": "12/2028"
  }`;

  cy.get('textarea.body-param__text')
    .clear()
    .type(paymentData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then(async (responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = await JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

      expect(parsedResponse).to.deep.equal({
        "message": "Invalid CVC"
      });
    });
});


it('POST /payBookingFee Wrong Card Holder Name', () => {
  cy.visit('http://localhost:8080/docs/#/payment/payBookingFee');
  cy.get('button.btn.try-out__btn').click();
  const paymentData = `{
    "cardHolderName": "John #$@Doe",
    "cardNumber": "9876543210987654",
    "CVC": 459,
    "expirationDate": "12/2028"
  }`;

  cy.get('textarea.body-param__text')
    .clear()
    .type(paymentData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then(async (responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = await JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

      expect(parsedResponse).to.deep.equal({
        "message": "Invalid Card Holder Name"
      });
    });
});


// it('POST /payBookingFee Wrong Name', () => {
//   cy.visit('http://localhost:8080/docs/#/payment/payBookingFee');
//   cy.get('button.btn.try-out__btn').click();
//   const paymentData = `{
//     "cardHolderName": "${'J'.repeat(300)}",
//     "cardNumber": "9876543210987654",
//     "CVC": 456,
//     "expirationDate": "12/2028"
//   }`;

//   cy.get('textarea.body-param__text')
//     .clear()
//     .type(paymentData, { parseSpecialCharSequences: false });

//   cy.get('button.btn.execute.opblock-control__btn').click();

//   cy.get('pre.microlight')
//     .invoke('text')
//     .then((responseText) => {
//       cy.log(responseText); // Debug log

//       const parsedResponse = JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces
//       cy.log(parsedResponse);

//       expect(parsedResponse).to.deep.equal({
//          "message": "Cardholder name is too long"
//       });
//     });
// });


it('POST /payBookingFee Wrong CardNumber', () => {
  cy.visit('http://localhost:8080/docs/#/payment/payBookingFee');
  cy.get('button.btn.try-out__btn').click();
  const paymentData = `{
    "cardHolderName": "John Doe",
    "cardNumber": "9876543210987654654465ddsadd4",
    "CVC": 456,
    "expirationDate": "12/2028"
  }`;

  cy.get('textarea.body-param__text')
    .clear()
    .type(paymentData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then(async (responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = await JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

      expect(parsedResponse).to.deep.equal({
        "message": "Invalid Card number"
      });
    });
});

it('POST /payBookingFee Wrong Date', () => {
  cy.visit('http://localhost:8080/docs/#/payment/payBookingFee');
  cy.get('button.btn.try-out__btn').click();
  const paymentData = `{
    "cardHolderName": "John Doe",
    "cardNumber": "9876543210987654",
    "CVC": 456,
    "expirationDate": "24/2028"
  }`;

  cy.get('textarea.body-param__text')
    .clear()
    .type(paymentData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then(async (responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = await JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

      expect(parsedResponse).to.deep.equal({
        "message": "Invalid Date"
      });
    });
});

it('POST /payBookingFee Everything Missing', () => {
  cy.visit('http://localhost:8080/docs/#/payment/payBookingFee');
  cy.get('button.btn.try-out__btn').click();
  const paymentData = `{
    "cardHolderName": null,
    "cardNumber": null,
    "CVC": null,
    "expirationDate": null
  }`;

  cy.get('textarea.body-param__text')
    .clear()
    .type(paymentData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then(async (responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = await JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

      expect(parsedResponse).to.deep.equal({
        "message": "request.body.cardHolderName should be string, request.body.cardNumber should be string, request.body.CVC should be number, request.body.expirationDate should be string",
        "errors": [
          {
            "path": ".body.cardHolderName",
            "message": "should be string",
            "errorCode": "type.openapi.validation"
          },
          {
            "path": ".body.cardNumber",
            "message": "should be string",
            "errorCode": "type.openapi.validation"
          },
          {
            "path": ".body.CVC",
            "message": "should be number",
            "errorCode": "type.openapi.validation"
          },
          {
            "path": ".body.expirationDate",
            "message": "should be string",
            "errorCode": "type.openapi.validation"
          }
        ]
      });
    });
});
