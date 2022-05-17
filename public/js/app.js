const weatherForm = document.querySelector("#weatherForm");
const searchWeather = document.querySelector("#weatherSearch");
const weatherReport = document.querySelector("#weatherReport");
const locationData = document.querySelector("#location");

const getWeather = async (address) => {
  searchWeather.value = "";
  weatherReport.textContent = "Loading ...";
  locationData.textContent = "";

  try {
    const url = `http://localhost:3000/weather?address=${address}`;
    const res = await fetch(url);
    const report = await res.json();

    const { description, location } = await report;

    weatherReport.textContent = description;
    locationData.textContent = location;
  } catch (error) {
    weatherReport.textContent = "weather report unavilable";
  }
};

weatherForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (!searchWeather.value)
    return (weatherReport.textContent = "location should not be empty");

  getWeather(searchWeather.value);
});
