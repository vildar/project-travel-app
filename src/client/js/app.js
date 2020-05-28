import fetch from 'node-fetch'

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

export function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

export const handleSubmit = async (location, startDate, endDate) => {
    const numOfDays = daysBetween(startDate, endDate)
    console.log(numOfDays)

    return fetch(`http://localhost:3000/travelPlan`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            location: location,
            numOfDays: numOfDays
        })
    }).then(res => res.json()).then((result) => {
        result.startDate = startDate
        result.endDate = endDate
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

        trip.classList.add("tripCard")
        sDate.id = "cardSDate"
        eDate.id = "cardEDate"
        hTemp.id = "cardHTemp"
        lTemp.id = "cardLTemp"
        image.id = "cardImage"
        destination.id = "cardDestination"
        description.id = "cardDescription"
        noOfDays.id = "cardNumOfDays"
        tripInfo.id = "cardTripInfo"
        weatherInfo.id = "cardWeatherInfo"
        
        sDate.textContent = `Departing: ${result.startDate}`
        eDate.textContent = `Back on: ${result.endDate}`
        hTemp.textContent = `High: ${result.highTemp}\xB0 C`
        lTemp.textContent = `Low: ${result.lowTemp}\xB0 C`
        destination.textContent = `My Trip to: ${result.location}`
        description.textContent = result.description
        image.setAttribute("src", result.imageURL)
        noOfDays.textContent = `Your trip to ${result.location} is ${result.numOfDays} days away.`

        trips.appendChild(trip)

        tripInfo.innerHTML = `<span>Trip Info</span>`
        tripInfo.appendChild(destination)
        tripInfo.appendChild(sDate)
        tripInfo.appendChild(eDate)
        
        weatherInfo.innerHTML = '<span>Weather Info</span>'
        weatherInfo.appendChild(hTemp)
        weatherInfo.appendChild(lTemp)
        weatherInfo.appendChild(description)
        
        trip.appendChild(image)
        trip.appendChild(tripInfo)
        trip.appendChild(noOfDays)
        trip.appendChild(weatherInfo)
    })
}