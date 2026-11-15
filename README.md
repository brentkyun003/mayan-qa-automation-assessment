

\# Mayan QA Automation



Playwright and TypeScript automation project for the Coffee Cart application.



\## Tech Stack



\- TypeScript

\- Playwright

\- Node.js

\- GitHub Actions



\## Prerequisites



\- Node.js

\- npm



\## Installation



Clone the repository and install dependencies:



```bash

npm ci

npx playwright install

```



\## Run Tests



Run tests in headless mode:



```bash

npm test

```



Run tests with the browser visible:



```bash

npm run test:headed

```



View the HTML test report:



```bash

npm run test:report

```



\## Automated Scenario



The checkout test covers:



1\. Open Coffee Cart.

2\. Add Espresso to the cart.

3\. Handle the promotional popup if it appears.

4\. Proceed to checkout.

5\. Enter customer details.

6\. Submit payment details.

7\. Verify the cart is empty after checkout.



\## Project Structure



```text

mayan-qa-automation/

├── .github/

│   └── workflows/

│       └── playwright.yml

├── fixtures/

│   └── test-fixtures.ts

├── pages/

│   ├── HomePage.ts

│   └── CheckoutPage.ts

├── test-data/

│   └── checkout-data.ts

├── tests/

│   └── checkout.spec.ts

├── playwright.config.ts

├── package.json

├── package-lock.json

├── tsconfig.json

└── README.md

```



\## CI/CD



GitHub Actions automatically runs the Playwright tests on pushes and pull requests to the `main` branch.



