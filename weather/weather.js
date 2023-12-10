function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "b7ee24518d2b8214a5c443e9e6a365f5";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById("weather-info");
            weatherInfo.classList.remove("error");

            if (data.cod === 200) {
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const description = data.weather[0].description;

                weatherInfo.textContent = `Temperature: ${temperature}°C, Description: ${description}, Humidity: ${humidity}`;

                // Dynamically add image based on weather conditions
                const img = new Image(100, 200); // width, height

                if (description.includes("rain")) {
                    weatherInfo.style.color = "blue";
                    img.src = 'rainy.png';
                } else if (description.includes("cloud")) {
                    weatherInfo.style.color = "gray";
                    img.src = 'weather.jpeg';
                } else if (description.includes("clear")) {
                    weatherInfo.style.color = "yellow";
                    img.src = 'cloudy.jpg';
                } else {
                    weatherInfo.style.color = "black";
                }

                if (img.src) {
                    document.body.appendChild(img);
                }

            } else {
                weatherInfo.textContent = `City not found. Please try again.`;
                weatherInfo.classList.add("error");
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            const weatherInfo = document.getElementById("weather-info");
            weatherInfo.textContent = `Error fetching data. Please try again later.`;
            weatherInfo.classList.add("error");
        });
}
