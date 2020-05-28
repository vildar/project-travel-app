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
        console.log(result)
    })
}