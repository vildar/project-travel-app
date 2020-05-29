import fetch from 'node-fetch'

//Function to ensure that timezones don't affect the calculation
export function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

//Function to calculate the number of days between two dates
export function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

//Function to generate the cards displayed after the save trip button is clicked
export function generateCards(result){
    const trips = document.getElementById("savedTrips")
    const trip = document.createElement("div")
    const tripInfo = document.createElement("div")
    const weatherInfo = document.createElement("div")
    const sDate = document.createElement("p")
    const eDate = document.createElement("p")
    const hTemp = document.createElement("p")
    const image = document.createElement("img")
    const lTemp = document.createElement("p")
    const destination = document.createElement("p")
    const description = document.createElement("p")
    const noOfDays = document.createElement("p")
    const daysLeft = document.createElement("p")

    trip.classList.add("tripCard")
    sDate.id = "cardSDate"
    eDate.id = "cardEDate"
    hTemp.id = "cardHTemp"
    lTemp.id = "cardLTemp"
    image.id = "cardImage"
    destination.id = "cardDestination"
    description.id = "cardDescription"
    noOfDays.id = "cardNumOfDays"
    daysLeft.id = "cardDaysLeft"
    tripInfo.id = "cardTripInfo"
    weatherInfo.id = "cardWeatherInfo"
    
    sDate.textContent = `Departing: ${result.startDate}`
    eDate.textContent = `Back on: ${result.endDate}`
    hTemp.textContent = `High: ${result.highTemp}\xB0 C`
    lTemp.textContent = `Low: ${result.lowTemp}\xB0 C`
    destination.textContent = `My Trip to: ${result.location}`
    description.textContent = result.description
    image.setAttribute("src", result.imageURL)
    noOfDays.textContent = `Trip Length: ${result.numOfDays} days`
    daysLeft.textContent = `${result.location} is ${result.daysLeft} days away.`

    trips.appendChild(trip)

    tripInfo.innerHTML = `<span>Trip Info</span>`
    tripInfo.appendChild(destination)
    tripInfo.appendChild(sDate)
    tripInfo.appendChild(eDate)
    tripInfo.appendChild(noOfDays)
    
    weatherInfo.innerHTML = '<span>Weather Info</span>'
    weatherInfo.appendChild(hTemp)
    weatherInfo.appendChild(lTemp)
    weatherInfo.appendChild(description)
    
    trip.appendChild(image)
    trip.appendChild(tripInfo)
    trip.appendChild(daysLeft)
    trip.appendChild(weatherInfo)
}

//Function that handles the onClick event
export const handleSubmit = async (location, startDate, endDate, daysLeft) => {
    const numOfDays = daysBetween(startDate, endDate)

    return fetch(`http://localhost:3000/travelPlan`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            location: location,
            numOfDays: numOfDays,
            startDate: startDate,
            endDate: endDate,
            daysLeft: daysLeft
        })
    }).then(res => res.json()).then((result) => {
        generateCards(result)
    })
}