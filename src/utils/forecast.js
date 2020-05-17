const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const access_key = process.env.WEATHERSTACK;
const forecast = (latitude, longitude) => {
    const url = 'http://api.weatherstack.com/current';
    const query = `${latitude},${longitude}`;
    return new Promise((resolve, reject) => {
        axios.get(url, { params: { access_key, query } })
            .then(({ data } = {}) => {
                if (data.error) {
                    reject('Unable to find location');
                } else {
                    resolve(`${data.current.weather_descriptions[0]}.
                    <br>It is currently ${data.current.temperature} degress out.
                    <br>There is a ${data.current.precip}% chance of rain.
                    <br>It feels like ${data.current.feelslike} degrees.
                    <br>Data observed on ${data.current.observation_time}.`)
                }
            }).catch((err) => {
                console.error(err);
                reject('Unable to connect to weather services!');
            });
    });
}

module.exports = forecast