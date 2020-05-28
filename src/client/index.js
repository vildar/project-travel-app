import {handleSubmit, daysBetween, generateCards } from './js/app'
import fetch from 'node-fetch'

import "./styles/style.scss"

const location = document.getElementById("tripLocation")
const startDate = document.getElementById("tripStartDate")
const endDate = document.getElementById("tripEndDate")
const submitButton = document.getElementById("submitBtn")

export function checkDate(date){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  return daysBetween(today, date)
}

async function pageInitialise(){
  const results = await (await fetch('http://localhost:3000/travelPlan')).json();
  console.log(results)
  if (results.length) {
    results.forEach(result => {
      generateCards(result)
    });
  }
}

pageInitialise()

submitButton.addEventListener("click", event => {
  event.preventDefault()
  if(checkDate(startDate.value) < 0 || daysBetween(startDate.value, endDate.value) < 0){
    alert('1. The start of your trip must be today or after today \n2. The end of your trip must be after it starts(obviously)')
  } else{
    handleSubmit(location.value, startDate.value, endDate.value)
  }
});