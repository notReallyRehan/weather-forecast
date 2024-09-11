src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"


    let currentUnit = 'C';

    async function fetchForecast() {
        const citySelect = document.getElementById('citySelect');
        const [lat, lon] = citySelect.value.split(',');
        const url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Fetched data:', data); // Debug log
            displayForecast(data.dataseries);
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    }

    function displayForecast(data) {
        const forecastEl = document.getElementById('forecast');
        forecastEl.innerHTML = '';

        data.forEach((day, index) => {
            if (index < 7) {
                const dayEl = document.createElement('div');
                dayEl.className = 'day col-md-3';
                const weatherIcon = getWeatherIcon(day.weather);
                dayEl.innerHTML = `
                    <h3>Day ${index + 1}</h3>
                    <img src="${weatherIcon}" alt="${day.weather}">
                    <p><i class="fas fa-temperature-low"></i> Temperature: <span class="temp">${day.temp2m}</span> ° <span class="unit">C</span></p>
                    <p><i class="fas fa-cloud"></i> Weather: ${day.weather}</p>
                `;
                forecastEl.appendChild(dayEl);
            }
        });
    }

    function getWeatherIcon(weather) {
const weatherIcons = {
clear: 'Go6cNYa7SZG9NLhyyBVF_A_538d7aea2d96463dbfd78a23f104c2f1_Starter\images\clear.png',
partlyCloudy: 'https://tse4.mm.bing.net/th?id=OIP.fHBX3TvGLnyWrMwU2srpjAHaHa&pid=Api&P=0&h=220.png',
mostlyCloudy: 'https://www.flaticon.com/svg/static/icons/svg/861/861061.png',
cloudy: 'https://www.flaticon.com/svg/static/icons/svg/861/861062.png',
rain: 'https://www.flaticon.com/svg/static/icons/svg/861/861063.svg',
snow: 'https://www.flaticon.com/svg/static/icons/svg/861/861064.svg',
thunderstorm: 'https://www.flaticon.com/svg/static/icons/svg/861/861065.svg',
default: 'https://www.flaticon.com/svg/static/icons/svg/861/861066.svg'
};

return weatherIcons[weather] || weatherIcons.default;
}

    function convertToCelsius() {
        if (currentUnit === 'C') return;
        const temps = document.querySelectorAll('.temp');
        temps.forEach(temp => {
            const fahrenheit = parseFloat(temp.textContent);
            const celsius = ((fahrenheit - 32) * 5) / 9;
            temp.textContent = celsius.toFixed(1);
        });
        document.querySelectorAll('.unit').forEach(unit => unit.textContent = 'C');
        currentUnit = 'C';
    }

    function convertToFahrenheit() {
        if (currentUnit === 'F') return;
        const temps = document.querySelectorAll('.temp');
        temps.forEach(temp => {
            const celsius = parseFloat(temp.textContent);
            const fahrenheit = (celsius * 9) / 5 + 32;
            temp.textContent = fahrenheit.toFixed(1);
        });
        document.querySelectorAll('.unit').forEach(unit => unit.textContent = 'F');
        currentUnit = 'F';
    }
