# Thessbooker API

REST API for a restaurant reservation app, built for the Software Engineering II course at Aristotle University of Thessaloniki. The server is generated from an OpenAPI 3.0 specification (`api/openapi.yaml`) with Swagger Codegen and runs on Node.js with Express.

## Endpoints

| Resource | Routes |
|---|---|
| Reservations | `GET/POST /reservations`, `GET/PUT/DELETE /reservations/{id}` |
| Pre-orders | `GET/POST /preOrder`, `GET/PUT/DELETE /preOrder/{id}` |
| Ratings | `GET/POST /ratings`, `GET/PUT/DELETE /ratings/{id}` |
| Reviews | `GET /reviews` and related routes |
| Payment | `POST /payBookingFee` |
| Directions | `GET /directions` |
| Search | `GET /search` |

The full specification is in `api/openapi.yaml`, and interactive Swagger UI documentation is served at `/docs` when the server is running.

## Project structure

- `api/`: OpenAPI specification
- `controllers/`: request handlers, one per resource
- `service/`: business logic for each resource
- `tests/`: AVA unit tests
- `cypress/`: Cypress end-to-end tests
- `utils/`: response helpers

## Run locally

```bash
npm install
npm start
```

The server listens on http://localhost:8080 and the docs are at http://localhost:8080/docs.

## Run with Docker

```bash
docker build -t thessbooker .
docker run -p 8080:8080 thessbooker
```

## Tests

```bash
npm test               # AVA unit tests with c8 coverage
npm run cypress:run    # Cypress end-to-end tests (server must be running)
```

## CI/CD

A GitHub Actions workflow (`.github/workflows/cicd.yml`) runs on every push:

1. **CI:** installs dependencies, runs the AVA tests, then starts the server and runs the Cypress tests.
2. **CD:** if CI passes, the server is deployed to Render.
