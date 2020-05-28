import fetch from 'node-fetch'

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
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
        
        sDate.textContent = `Departing: ${result.startDate}`
        eDate.textContent = `Back on: ${result.endDate}`
        hTemp.textContent = `High: ${result.highTemp}`
        lTemp.textContent = `Low: ${result.lowTemp}`
        destination.textContent = `My Trip to: ${result.location}`
        description.textContent = result.description
        image.setAttribute("src", result.imageURL)
        noOfDays.textContent = `Your trip to ${result.destination} is ${result.numOfDays} away.`

        trips.appendChild(trip)
        trip.appendChild(image)
        trip.appendChild(destination)
        trip.appendChild(sDate)
        trip.appendChild(eDate)
        trip.appendChild(noOfDays)
        trip.appendChild(hTemp)
        trip.appendChild(lTemp)
        trip.appendChild(description)
    })
}