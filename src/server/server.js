require('dotenv').config()

import fetch from "node-fetch"

const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const config = require("../../webpack.dev")
const cors = require('cors')

const compiler = webpack(config)

const isDevEnvironment = process.env.NODE_ENV == "development"

const app = express()

app.use(cors());
app.use(express.json())

app.listen(process.env.express_port, () => {
  console.log(`Express server listening on port ${process.env.express_port}!`)
})

if (isDevEnvironment) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  )
  app.use(require("webpack-hot-middleware")(compiler))
}

if (!isDevEnvironment){
    app.use(express.static("dist"))
}

const geonamesAPIKey = process.env.geonamesAPIKey
const weatherbitAPIKey = process.env.weatherbitAPIKey
const pixabayAPIKey = process.env.pixabayAPIKey
const cards = []

app.post("/travelPlan", async (req, res) => {
  try {
    const geoURL = `http://api.geonames.org/postalCodeSearchJSON?maxRows=1&username=${geonamesAPIKey}&placename=`
  
    const wbURLCurrent = `https://api.weatherbit.io/v2.0/current?units=M&key=${weatherbitAPIKey}`
    const wbURLForecast = `https://api.weatherbit.io/v2.0/forecast/daily?units=M&key=${weatherbitAPIKey}`

    const pixabayURL = `https://pixabay.com/api/?key=${pixabayAPIKey}&image_type=photo&q=`

    const {location, numOfDays, startDate, endDate} = req.body
    console.log(numOfDays)
    const geoData = await(await fetch(`${geoURL}${location}`)).json()
    const lat = geoData.postalCodes[0].lat
    const lng = geoData.postalCodes[0].lng
    let wbData = {}
    let {highTemp, lowTemp} = 0.0

    if (numOfDays <= 7){
      const temp = await(await fetch(`${wbURLCurrent}&lat=${lat}&lon=${lng}`)).json()
      wbData = temp.data[0]
      highTemp = wbData.temp
      lowTemp = wbData.temp
    } else{
      const temp = await(await fetch(`${wbURLForecast}&lat=${lat}&lon=${lng}`)).json()
      wbData = temp.data[8]
      highTemp = wbData.high_temp
      lowTemp = wbData.low_temp
    }
    
    const description = wbData.weather.description

    const pixaData = await(await fetch(`${pixabayURL}${location}`)).json()
    const imageURL = pixaData.hits[0].previewURL

    let result = {}
    result.location = location
    result.numOfDays = numOfDays
    result.highTemp = highTemp
    result.lowTemp = lowTemp
    result.description = description
    result.imageURL = imageURL
    result.startDate = startDate
    result.endDate = endDate

    cards.push(result)
    console.log(cards)
    res.send(result)
  } catch (error) {
    console.error(error)
  }
})

app.get("/travelPlan", (req, res) => {
  res.send(cards)
})