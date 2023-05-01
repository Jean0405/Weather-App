const container = document.querySelector('.container');
let formSearch = document.querySelector('#form-search');
const imgContainer = document.querySelector('.img-container');
const temperatureContainer = document.querySelector('.temperature-container');
const weatherDetails = document.querySelector('.weather-details');

formSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    const APIKey = '6257ceb10494963de720e86d19f28e6e';
    const data = Object.fromEntries(new FormData(e.target));
    const city = data.city;
    console.log(data)

    if (city === '') {
        container.style.height = '4rem';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            
            if (json.cod === '404') {
                container.style.height = '28rem';
                temperatureContainer.style.display = 'none';
                weatherDetails.style.display = 'none';
                imgContainer.style.display = 'block';
                imgContainer.classList.add('fadeIn');
                return;
            }

            imgContainer.style.display = 'none';
            imgContainer.classList.remove('fadeIn');


            const image = document.querySelector('.img-weather');
            const temperature = temperatureContainer.querySelector('.temperature');
            const description = temperatureContainer.querySelector('.temperature-container .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './img/clear.png';
                    break;

                case 'Rain':
                    image.src = './img/rain.png';
                    break;

                case 'Snow':
                    image.src = './img/snow.pngg';
                    break;

                case 'Clouds':
                    image.src = './img/clouds.png';
                    break;

                case 'Haze':
                    image.src = './img/haze.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${Math.floor(json.main.temp)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.floor(json.wind.speed)}Km/h`;

            temperatureContainer.style.display = '';
            weatherDetails.style.display = '';
            temperatureContainer.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '38rem';
        })

});