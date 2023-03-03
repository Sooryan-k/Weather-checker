const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'c94a23a3478bb3b12376ae9dce2da8f7';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png';
                    break;

                case 'Rain':
                    image.src = 'https://cdn3.iconfinder.com/data/icons/garden-line-filled-blue/154/Cloud_farm_field_garden_gardening_plant_rain-256.png';
                    break;

                case 'Snow':
                    image.src = 'https://cdn2.iconfinder.com/data/icons/weather-forecast-filled-outline/512/WEATHER_-_Lineal_color_Artboard-22-512.png';
                    break;

                case 'Clouds':
                    image.src = 'https://cdn3.iconfinder.com/data/icons/circle-weather/512/weather_1-512.png';
                    break;

                case 'Haze':
                    image.src = 'https://thumbs.dreamstime.com/b/fog-mist-haze-icon-weather-forecast-application-widget-color-version-light-gray-background-174537566.jpg';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});