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
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('img/iceland2.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/valley2.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/iceland3.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/mountains2.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/iceland4.jpg')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/img/iceland5.jpg')",
  ];

  let currentIndex = 0;
  console.log(currentIndex);
  function updatedBackgroundImage() {
    document.body.style.backgroundImage = backgroundImagesUrls[currentIndex];
    console.log(document.body.style.backgroundImage);

    currentIndex = (currentIndex + 1) % backgroundImagesUrls.length;
  }

  updatedBackgroundImage();
  setInterval(updatedBackgroundImage, 30000);
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageLoading.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
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
            // const day = currentDate.getDate();
            // const month = currentDate.getMonth() + 1;
            // const year = currentDate.getFullYear();

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
            // dataTime.textContent = formattedTime;
          }

          // setInterval(getCurrentTime, 1000);
          dataTime.textContent = getCurrentTime();
          const currentDate = getCurrentDate();

          forecastContainer.style.display = "block";

          dataDate.textContent = currentDate;
          messageLoading.textContent = "";
          currentWeather.textContent = "Current Weather";
          temperature.textContent = `${degrees}°C`;

          const weatherImg = document.createElement("img");
          weatherImg.className = "weather_img";
          const parentOfWeatherImg =
            document.getElementById("img_and_temparture");
          weatherImg.src = weatherImage;
          parentOfWeatherImg.insertBefore(weatherImg, temperature.nextSibling);

          realfeel.textContent = `RealFeel ${feelsLike}°C`;
          weatherDescription.textContent = description;

          windSpeed.textContent = `${wind} Km/h`;
          const windGusts = document.createElement("p");
          windGusts.textContent = `Wind Gusts`;
          const parentOfwindGusts = document.getElementById("flexbox1");
          parentOfwindGusts.insertBefore(windGusts, windSpeed);

          windDirectionData.textContent = windDirection;
          const windDirectionParagraph = document.createElement("p");
          windDirectionParagraph.textContent = `Wind Direction`;

          const parentOfWindDirectionParagraph =
            document.getElementById("flexbox2");
          parentOfWindDirectionParagraph.insertBefore(
            windDirectionParagraph,
            windDirectionData
          );

          humidityData.textContent = `${humidity}%`;
          const humidityParagraph = document.createElement("p");
          humidityParagraph.textContent = `Humidity`;
          const parentOfHumidityParagraph = document.getElementById("flexbox3");
          parentOfHumidityParagraph.insertBefore(
            humidityParagraph,
            humidityData
          );

          uvData.textContent = UVIndex;
          const UVIndexParagraph = document.createElement("p");
          UVIndexParagraph.textContent = "UV Index";
          const parentOfUVIndexParagraph = document.getElementById("flexbox4");
          parentOfUVIndexParagraph.insertBefore(UVIndexParagraph, uvData);

          locationTitle.textContent = `${city}, ${country}, ${region} `;
          const locationParagraph = document.createElement("p");
          locationParagraph.textContent = "Place";
          const parentOfLocationParagraph = document.getElementById("flexbox5");
          parentOfLocationParagraph.insertBefore(
            locationParagraph,
            locationTitle
          );

          locationCoordinations.textContent = `${longitude}, ${latitude}`;
          const coordinationsParagraph = document.createElement("p");
          coordinationsParagraph.textContent = "Location";
          const parentOfCoordinationsParagraph =
            document.getElementById("flexbox6");
          parentOfCoordinationsParagraph.insertBefore(
            coordinationsParagraph,
            locationCoordinations
          );
        }
      });
    }
  );
});
