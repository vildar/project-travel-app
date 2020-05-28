import { handleSubmit } from "./js/app";

import "./styles/style.scss";

const location = document.getElementById("tripLocation")
const startDate = document.getElementById("tripStartDate")
const endDate = document.getElementById("tripEndDate")
const submitButton = document.getElementById("submitBtn")

submitButton.addEventListener("click", event => {
  event.preventDefault()
  handleSubmit(location.value, startDate.value, endDate.value)
});

// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", () => {
//       navigator.serviceWorker
//         .register("/service-worker.js")
//         .then(registration => {
//           console.log("SW registered: ", registration);
//         })
//         .catch(registrationError => {
//           console.log("SW registration failed: ", registrationError);
//         });
//     });
//   }