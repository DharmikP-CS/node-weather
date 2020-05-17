const axios = require('axios');
const params = {
    access_token: 'pk.eyJ1IjoiZGhhcm1pa3A1NzIiLCJhIjoiY2thOWdmejdvMDJ0ZzJxbzdpZnVrdXBhbyJ9.mrazd2i-4zSCBOK1ZmSPLQ',
    limit: 1
}
const geocode = (address) => {
    return new Promise((resolve, reject) => {
        const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`
        axios.get(mapboxUrl, { params })
            .then(({ data } = {}) => {
                if (!data || data.features.length === 0) {
                    reject('Unable to find location. Try another search.')
                } else {
                    return resolve({
                        latitude: data.features[0].center[1],
                        longitude: data.features[0].center[0],
                        location: data.features[0].place_name
                    })
                }
            }).catch((err) => {
                console.error(err);
                reject('Unable to connect to location services!');
            });

    })
}

module.exports = geocode