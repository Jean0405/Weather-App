const container = document.querySelector('.container');
let formSearch = document.querySelector('#form-search');
const imgContainer = document.querySelector('.img-container');
const temperatureContainer = document.querySelector('.temperature-container');
const weatherDetails = document.querySelector('.weather-details');

formSearch.addEventListener('submit', (e) => {

    const APIKey = '6257ceb10494963de720e86d19f28e6e';
    const data =  Object.fromEntries(new FormData(e.target));
    const city = data.city;

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

        if (json.cod === '404') {
            container.style.height = '40rem';
            temperatureContainer.style.display = 'none';
            weatherDetails.style.display = 'none';
            imgContainer.style.display = 'block';
            imgContainer.classList.add('fadeIn');
            return;
        }

            imgContainer.style.display = 'none';
            imgContainer.classList.remove('fadeIn');

            const image = document.querySelector('.img-weather');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.description');
            const humidity = document.querySelector('.humidity humidity-details span');
            const wind = document.querySelector('.wind .wind-details span');
    })

    e.preventDefault();
})