const axios = require('axios');
const access_key = 'c2273614e227b8f40fe6a2e4b6da2fe0';
const forecast = (latitude, longitude) => {
    const url = 'http://api.weatherstack.com/current';
    const query = `${latitude},${longitude}`;
    return new Promise((resolve, reject) => {
        axios.get(url, { params: { access_key, query } })
            .then(({ data } = {}) => {
                if (data.error) {
                    reject('Unable to find location');
                } else {
                    resolve(`${data.current.weather_descriptions[0]} It is currently ${data.current.temperature} degress out. There is a ${data.current.precip}% chance of rain.`)
                }
            }).catch((err) => {
                console.error(err);
                reject('Unable to connect to weather services!');
            });
    });
}

module.exports = forecast