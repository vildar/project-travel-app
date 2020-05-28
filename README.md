# PROJECT - TRIPNOTE
This is a front end project created using webpack. The application takes in three values; travel destination, trip start date and trip end date. Then, the application returns a card that contains information about the trip including weather details, length of the trip and the days left.
The application is created using node, express and webpack. 

## Instructions

First, run `npm install` to install all the dependencies for the application.

To launch the application,
```
npm run build
npm start
```
Then, navigate to http://localhost:3000 on your browser. The 'build' script creates the dist folder which runs the production mode configuration. The 'start' script runs the express server.

To run the webpack dev server,
`npm run dev`

To run jest tests,
`npm test`

### Features
* Users can choose any city that has its coordinates in the Geonames API.
* Users can select start and end dates for their trips.
* Users can view pictures of the chosen city courtesy of the Pixabay API.
* Users can obtain weather data about the city via the WeatherBit API.
* Users can view data related to the length of the trip as well as time remaining.

### Tools Used
* Node
* Express
* Webpack
* Geonames API
* WeatherBit API
* Pixabay API