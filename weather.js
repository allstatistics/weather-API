let key = 'df317e4f3ab7462482f70244230409'
let city;
let infoDiv = document.getElementsByClassName('parent-div')[0];
document.getElementsByClassName('btn')[0].addEventListener('click', () => {
    let cityName = document.getElementById('city-name').value;
    city = cityName;
    let name = document.getElementsByClassName('country-name')[0];
    axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}`)
        .then((response) => {
            document.getElementById('error-message').innerHTML = ''
            const forecastData = response.data.forecast.forecastday[0].hour;
            name.innerHTML = `<b>${response.data.location.name}, ${response.data.location.country}</b> <em>${forecastData[0].time.split(' ')[0]}</em>`
            infoDiv.innerHTML = '';
            forecastData.map((info) => {
                infoDiv.innerHTML += `
                <div class="information">
                    <p><img src="${info.condition.icon}" alt="404"></p>
                    <p class="weather-description">${info.condition.text}</p>
                    <p class="temperature">${info.temp_c}°</p>
                    <p class="hour"> ${info.time.split(" ")[1]}</p> 
                </div>
                `
            })

        })
        .catch((err) => {
            console.log(err);
            name.innerHTML = ''
            infoDiv.innerHTML = ''
            document.getElementById('error-message').innerHTML = err.response.data.error.message
        })
})