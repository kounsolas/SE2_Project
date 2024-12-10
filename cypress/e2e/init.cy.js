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
    .then((responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

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
    .then((responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

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
    .then((responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

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
    .then((responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

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
    .then((responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

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
    .then((responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

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

///////////////////////////////////Ratings/////////////////////////////////////

it('POST /ratings', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/post_ratings');
  cy.get('button.btn.try-out__btn').click();
  const ratingsData = `{
    "user_id": "user123",
    "rating": 4.5,
    "restaurant_name": "Mamalouka"
  }`;

  cy.get('textarea.body-param__text')
    .clear()
    .type(ratingsData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then((responseText) => {
      cy.log(responseText);

      const parsedResponse = JSON.parse(responseText.trim());

      expect(parsedResponse).to.deep.equal({
        user_id: "user123",
        rating: 4.5,
        restaurant_name: "Mamalouka"
      });
    });
});

it('GET /ratings', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/get_ratings');
  cy.get('button.btn.try-out__btn').click();

  cy.get('input.parameters__text') // Assuming the query input is available for `restaurant_name`
    .clear()
    .type('Mamalouka');

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then((responseText) => {
      cy.log(responseText);

      const parsedResponse = JSON.parse(responseText.trim());

      expect(parsedResponse).to.be.an('array'); // Assert the response is an array
      parsedResponse.forEach((rating) => {
        expect(rating.restaurant_name).to.equal('Mamalouka'); // Assert the restaurant name matches
      });
    });
});

it('GET /ratings/{id}', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/get_ratings__id_');
  cy.get('button.btn.try-out__btn').click();

  cy.get('input.parameters__text') // Assuming the input for "id" is available
    .first()
    .clear()
    .type('user123'); // Valid user ID

  cy.get('input.parameters__text') // Assuming the input for "restaurant_name"
    .eq(1)
    .clear()
    .type('Mamalouka');

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then((responseText) => {
      cy.log(responseText);

      const parsedResponse = JSON.parse(responseText.trim());

      expect(parsedResponse).to.deep.equal({
        user_id: "user123",
        rating: 4.5,
        restaurant_name: "Mamalouka"
      });
    });
});

it('PUT /ratings/{id}', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/put_ratings__id_');
  cy.get('button.btn.try-out__btn').click();

  cy.get('input.parameters__text') // Input for "id"
    .first()
    .clear()
    .type('user123'); // Valid user ID

  cy.get('input.parameters__text') // Input for "restaurant_name"
    .eq(1)
    .clear()
    .type('Mamalouka');

  const updatedRatingsData = `{
    "user_id": "user123",
    "rating": 5.0,
    "restaurant_name": "Mamalouka"
  }`;

  cy.get('textarea.body-param__text')
    .clear()
    .type(updatedRatingsData, { parseSpecialCharSequences: false });

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then((responseText) => {
      cy.log(responseText);

      const parsedResponse = JSON.parse(responseText.trim());

      expect(parsedResponse).to.deep.equal({
        user_id: "user123",
        rating: 5.0,
        restaurant_name: "Mamalouka"
      });
    });
});

it('DELETE /ratings/{id}', () => {
  cy.visit('http://localhost:8080/docs/#/ratings/delete_ratings__id_');
  cy.get('button.btn.try-out__btn').click();

  cy.get('input.parameters__text') // Input for "id"
    .clear()
    .type('user123'); // Valid user ID

  cy.get('button.btn.execute.opblock-control__btn').click();

  cy.get('pre.microlight')
    .invoke('text')
    .then((responseText) => {
      cy.log(responseText);

      const parsedResponse = JSON.parse(responseText.trim());

      expect(parsedResponse).to.deep.equal({
        success: true
      });
    });
});


///////////////////////////////////Reviews/////////////////////////////////////

it('GET /reviews', () => {
  // Visit the Swagger documentation page for the "GET /reviews" endpoint
  cy.visit('http://localhost:8080/docs/#/reviews/reviewsGET');
  
  // Click the "Try it out" button to activate the Swagger UI for the endpoint
  cy.get('button.btn.try-out__btn').click();
  
  // Optionally, add a query parameter for "restaurantName" (if needed)
  const restaurantName = 'mamalouka';
  cy.get('input[placeholder="restaurantName"]').type(restaurantName);
  
  // Execute the GET request
  cy.get('button.btn.execute.opblock-control__btn').click();

  // Validate the response
  cy.get('pre.microlight')
    .invoke('text')
    .then((responseText) => {
      cy.log(responseText); // Debug log

      const parsedResponse = JSON.parse(responseText.trim()); // Trim to remove any leading/trailing spaces

      // Expected structure of reviews
      const expectedResponse = [
        {
          user_id: 'user_id',
          restaurant_id: 'restaurant_id',
          rating: 0.8008281904610115,
          comment: 'comment',
          id: 'id',
        },
        {
          user_id: 'user_id',
          restaurant_id: 'restaurant_id',
          rating: 0.8008281904610115,
          comment: 'comment',
          id: 'id',
        },
      ];

      // Assert that the response matches the expected structure
      expect(parsedResponse).to.deep.equal(expectedResponse);
    });
});

