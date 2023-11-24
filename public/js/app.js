const weatherForm = document.querySelector("form");
const forecastContainer = document.querySelector(".forecast-container");
const search = document.querySelector("input");
const messageLoading = document.querySelector("#message-1");

const locationTitle = document.querySelector(".location_title");

const temperature = document.querySelector(".degrees");
const realfeel = document.querySelector(".realfeel");
const weatherDescription = document.querySelector(".weather_description");
const uvData = document.querySelector(".UV_Index");
const windSpeed = document.querySelector(".wind_speed");
const windDirectionData = document.querySelector(".wind_direction");
const locationCoordinations = document.querySelector(".location_coordinations");
const humidityData = document.querySelector(".humidity");
const dataDate = document.querySelector(".date");
const dataTime = document.querySelector(".time");
const currentWeather = document.querySelector("#current_weather ");

document.addEventListener("DOMContentLoaded", function () {
  const backgroundImagesUrls = [
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('img/icelanda.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/iceland3a.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/valley2a.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/mountains2a.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/iceland4a.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/iceland5a.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/iceland6a.jpg')",
  ];

  let currentIndex = 0;

  function updatedBackgroundImage() {
    document.body.style.backgroundImage = backgroundImagesUrls[currentIndex];
    console.log(document.body.style.backgroundImage);

    currentIndex = (currentIndex + 1) % backgroundImagesUrls.length;
  }

  updatedBackgroundImage();
  setInterval(updatedBackgroundImage, 10000);
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageLoading.textContent = "Loading...";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageLoading.textContent = data.error;
      } else {
        const {
          city,
          country,
          region,
          degrees,
          wind,
          windDirection,
          weatherImage,
          description,
          humidity,
          feelsLike,
          UVIndex,
          latitude,
          longitude,
          label,
          address,
        } = data;

        function getCurrentDate() {
          const currentDate = new Date();
          const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          const formattedDate = currentDate.toLocaleDateString(
            "en-US",
            options
          );
          return formattedDate;
        }

        function getCurrentTime() {
          const currentTime = new Date();
          const seconds = currentTime.getSeconds();
          const minutes = currentTime.getMinutes();
          const hours = currentTime.getHours();

          const formattedMinutes = minutes.toString().padStart(2, "0");
          const formattedHours = hours.toString().padStart(2, "0");

          const formattedTime = `${formattedHours}:${formattedMinutes}`;
          return formattedTime;
        }

        dataTime.textContent = getCurrentTime();
        const currentDate = getCurrentDate();

        forecastContainer.style.display = "block";

        dataDate.textContent = currentDate;
        messageLoading.textContent = "";
        currentWeather.textContent = "Current Weather";
        temperature.textContent = `${degrees}°C`;

        const parentOfWeatherImg =
          document.getElementById("img_and_temparture");
        let weatherImgPar = document.querySelector(".weather_img");
        if (!weatherImgPar) {
          weatherImgPar = document.createElement("img");
          weatherImgPar.src = weatherImage;
          weatherImgPar.classList.add("weather_img");
          parentOfWeatherImg.insertBefore(
            weatherImgPar,
            temperature.nextSibling
          );
        } else {
          weatherImgPar.src = weatherImage;
        }

        realfeel.textContent = `RealFeel ${feelsLike}°C`;
        weatherDescription.textContent = description;

        windSpeed.textContent = `${wind} Km/h`;

        const parentOfwindGusts = document.getElementById("flexbox1");
        let windGusts = document.querySelector(".windGustPar");

        if (!windGusts) {
          windGusts = document.createElement("p");
          windGusts.classList.add("windGustPar");
          windGusts.textContent = `Wind Gusts`;
          parentOfwindGusts.insertBefore(windGusts, windSpeed);
        }

        windDirectionData.textContent = windDirection;
        const parentOfWindDirectionParagraph =
          document.getElementById("flexbox2");
        let windDirectionParagraph = document.querySelector(".windDirPar");

        if (!windDirectionParagraph) {
          windDirectionParagraph = document.createElement("p");
          windDirectionParagraph.classList.add("windDirPar");
          windDirectionParagraph.textContent = `Wind Direction`;
          parentOfWindDirectionParagraph.insertBefore(
            windDirectionParagraph,
            windDirectionData
          );
        }

        humidityData.textContent = `${humidity}%`;
        const parentOfHumidityParagraph = document.getElementById("flexbox3");
        let humidityParagraph = document.querySelector(".humidityPar");

        if (!humidityParagraph) {
          humidityParagraph = document.createElement("p");
          humidityParagraph.classList.add("humidityPar");
          humidityParagraph.textContent = `Humidity`;
          parentOfHumidityParagraph.insertBefore(
            humidityParagraph,
            humidityData
          );
        }

        uvData.textContent = UVIndex;
        const parentOfUVIndexParagraph = document.getElementById("flexbox4");
        let UVIndexParagraph = document.querySelector(".uvPar");

        if (!UVIndexParagraph) {
          UVIndexParagraph = document.createElement("p");
          humidityParagraph.classList.add("uvPar");
          UVIndexParagraph.textContent = "UV Index";
          parentOfUVIndexParagraph.insertBefore(UVIndexParagraph, uvData);
        }

        locationTitle.textContent = `${city}, ${country}, ${region} `;
        const parentOfLocationParagraph = document.getElementById("flexbox5");
        let locationParagraph = document.querySelector(".locationPar");

        if (!locationParagraph) {
          locationParagraph = document.createElement("p");
          locationParagraph.classList.add("locationPar");
          locationParagraph.textContent = "";
          parentOfLocationParagraph.insertBefore(
            locationParagraph,
            locationTitle
          );
        }

        locationCoordinations.textContent = `${longitude}°, ${latitude}°`;
        const parentOfCoordinationsParagraph =
          document.getElementById("flexbox6");
        let coordinationsParagraph =
          document.querySelector(".coordinationsPar");

        if (!coordinationsParagraph) {
          coordinationsParagraph = document.createElement("p");
          locationParagraph.classList.add("coordinationsPar");
          coordinationsParagraph.textContent = "Location";
          parentOfCoordinationsParagraph.insertBefore(
            coordinationsParagraph,
            locationCoordinations
          );
        }
      }
    });
  });
});
