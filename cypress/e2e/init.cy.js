describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/docs');
    })
})

it('GET /search', () => {
    cy.visit("http://localhost:8080/docs/#/search/searchGET");
    cy.get("button.btn.try-out__btn").click();
    cy.get("button.btn.execute.opblock-control__btn").click();
  /*
    // Extract and process the response text
    cy.get("pre.microlight").invoke("text").then(async (responseText) => {
      // Split the response by any known separator (if applicable)
      // cy.log(responseText);
      const responses = await responseText.split('][').map((res) => {
        return res.replace(/[\[\]]/g, '').trim(); // Remove brackets and whitespace
      });
      // cy.log(responses[0])
  
      // Parse and validate the first response
      const parsedResponse = await JSON.parse(`[${responses[0]}]`); // Wrap with brackets
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
    });*/
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
/*
  cy.get('pre.microlight')
    .invoke('text')
    .then(async (responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = await JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

      expect(parsedResponse).to.deep.equal({
        success: true,
      });
    });*/
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






// Test GET /preorder
it('GET /preorder', () => {
  cy.visit('http://localhost:8080/docs/#/preorder/preOrderGET');
  cy.get('button.btn.try-out__btn').click();
  cy.get('button.btn.execute.opblock-control__btn').click();
});

// Test POST /preorder
it('POST /preorder', () => {
  cy.visit('http://localhost:8080/docs/#/preorder/preOrderPOST');
  cy.get('button.btn.try-out__btn').click();

  const preorderData = `{
      "id": "789",
      "restaurant_name": "Souvlaki House",
      "items": ["Souvlaki", "Tzatziki"]
  }`;

  cy.get('textarea.body-param__text')
      .clear()
      .type(preorderData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();
});

// Test POST /preorder duplicate
it('POST /preorder Duplicate', () => {
  cy.visit('http://localhost:8080/docs/#/preorder/preOrderPOST');
  cy.get('button.btn.try-out__btn').click();

  const preorderData = `{
      "id": "123",
      "restaurant_name": "Mamalouka",
      "items": ["Pizza"]
  }`;

  cy.get('textarea.body-param__text')
      .clear()
      .type(preorderData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();
});





// Test GET /preorder/:id
it('GET /preorder/:id', () => {
  cy.visit('http://localhost:8080/docs/#/preorder/preOrderIdGET');
  cy.get('button.btn.try-out__btn').click();

  // Set the path parameter
  cy.get('input[placeholder="id"]').clear().type('123');

  cy.get('button.btn.execute.opblock-control__btn').click();
});

// Test PUT /preorder/:id
it('PUT /preorder/:id', () => {
  cy.visit('http://localhost:8080/docs/#/preorder/preOrderIdPUT');
  cy.get('button.btn.try-out__btn').click();

  // Set the path parameter
  cy.get('input[placeholder="id"]').clear().type('123');

  const updateData = `{
      "restaurant_name": "Updated Mamalouka",
      "items": ["Updated Pizza", "Updated Pasta"]
  }`;

  cy.get('textarea.body-param__text')
      .clear()
      .type(updateData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();
});

// Test DELETE /preorder/:id
it('DELETE /preorder/:id', () => {
  cy.visit('http://localhost:8080/docs/#/preorder/preOrderIdDELETE');
  cy.get('button.btn.try-out__btn').click();

  // Set the path parameter
  cy.get('input[placeholder="id"]').clear().type('123');

  cy.get('button.btn.execute.opblock-control__btn').click();

});


/////////////////////////Ratings/////////////////////////

//Test GET Ratings
it('GET /ratings', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/ratingsGET');
  cy.get('button.btn.try-out__btn').click();

  // Set the query parameter
  cy.get('input[placeholder="restaurant_name"]').clear().type('Mamalouka');

  cy.get('button.btn.execute.opblock-control__btn').click();
});


//Test POST Ratings
it('POST /ratings', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/ratingsPOST');
  cy.get('button.btn.try-out__btn').click();

  const ratingData = `{
      "user_id": "user123",
      "rating": 4.5,
      "restaurant_name": "Mamalouka"
  }`;

  // Set the query parameter
  cy.get('input[placeholder="restaurant_name"]').clear().type('Mamalouka');

  // Set the request body
  cy.get('textarea.body-param__text')
    .clear()
    .type(ratingData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();
});


//Test GET Ratings by ID
it('GET /ratings/{id}', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/ratingsIdGET');
  cy.get('button.btn.try-out__btn').click();

  // Set the path parameter
  cy.get('input[placeholder="id"]').clear().type('user123');

  // Set the query parameter
  cy.get('input[placeholder="restaurant_name"]').clear().type('Mamalouka');

  cy.get('button.btn.execute.opblock-control__btn').click();
});

//Test PUT Ratings by ID
it('PUT /ratings/{id}', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/ratingsIdPUT');
  cy.get('button.btn.try-out__btn').click();

  // Set the path parameter
  cy.get('input[placeholder="id"]').clear().type('user123');

  // Set the query parameter
  cy.get('input[placeholder="restaurant_name"]').clear().type('Mamalouka');

  const updatedRatingData = `{
      "user_id": "user123",
      "rating": 5.0,
      "restaurant_name": "Mamalouka"
  }`;

  // Set the request body
  cy.get('textarea.body-param__text')
    .clear()
    .type(updatedRatingData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();
});

//Test DELETE Ratings by ID 
it('DELETE /ratings/{id}', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/ratingsIdDELETE');
  cy.get('button.btn.try-out__btn').click();

  // Set the path parameter
  cy.get('input[placeholder="id"]').clear().type('user123');

  cy.get('button.btn.execute.opblock-control__btn').click();
});

/////////////////////////Reviews/////////////////////////

//Test GET Reviews
it('GET /reviews', () => {
  cy.visit('http://localhost:8080/docs/#/reviews/reviewsGET'); // Update this URL if necessary
  cy.get('button.btn.try-out__btn').click();

  // Optionally set the query parameter for filtering reviews by restaurant name
  cy.get('input[placeholder="restaurantName - The name of the restaurant to filter reviews"]')
    .clear()
    .type('Mamalouka'); 

  cy.get('button.btn.execute.opblock-control__btn').click();

  // // Example: Check if the response body contains reviews
  // cy.get('.response-col_description')
  //   .should('contain', '200')
  //   .and('contain', 'array'); // Adjust based on Swagger UI's response display structure
});





