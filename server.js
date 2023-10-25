const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
// console.log('!!!!!!!!',data);
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5005;
app.use(cors());

app.get('/weather', (req, res, next) => {
  try {
    // console.log('!!!!!',req.query);
    let searchQuery = req.query.searchQuery;
    let filteredData = data.filter(weather => weather.city_name.toLowerCase() === searchQuery.toLowerCase());
    // console.log('0000000',filteredData);
    // const forecasts = filteredData[0].data.map(weatherDataToInstant => console.log('TTT', weatherDataToInstant));

    const forecasts = filteredData[0].data.map(weatherDataToInstant => new Forecast(weatherDataToInstant));
    console.log('forecast!!!!', forecasts);
    res.status(200).send(forecasts);
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(weatherObject) {
    // console.log('weather!!!!!!',weatherObject);
    this.date = weatherObject.datetime;
    this.description = weatherObject.weather.description;
  }
}

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.get('*', (request, response) => {
  response.send('the route does not exsist, sorry. ERROR 404');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

