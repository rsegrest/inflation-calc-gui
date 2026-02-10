# inflation-calc-gui

This is a React/Typescript-based front end GUI for the Python-Flask Inflation Calculator API. When connected to the API, you can enter a starting dollar amount, start month, and optionally an end month to calculate the impact of inflation on the initial amount.

Set the toggle switch to enter an end date, otherwise the system will use the latest available data.

* Total rate of inflation there has been during the timespan
* How much value the starting amount of money has lost during that time
* How much the original amount would buy then, in today's dollars
* The CPI figure from the start and end dates
* A chart showing the month-by-month change in value over time

## Installation

You must have NodeJS and NPM installed to run the front-end.

Create a .env file to define the protocol (http or https), the IP address, and the port number for the URL, based on the deployment location of the API. There is an example file for running locally (.env.local.example).

### To install dependencies:
#### NPM 
```bash
npm install
```
#### Yarn
```bash
yarn
```
### To run the development version:

#### NPM 
```bash
npm run start
```
#### Yarn
```bash
yarn run start
```

### To build the app for production deployment:

#### NPM 
```bash
npm run build
```
#### Yarn
```bash
yarn run build
```

