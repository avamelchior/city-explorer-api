const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5005;
app.use(cors());

const weatherApiKey = process.env.WEATHER_API_KEY;

app.get('/weather', async (req, res, next) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required in the request' });
    }

    const response = await axios.get(`https://api.example.com/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`);

    const weatherData = response.data;

    const forecasts = weatherData.daily.map(weatherDataToInstant => new Forecast(weatherDataToInstant));

    res.status(200).json(weatherData);
  } catch (error) {
    next(error);
  }
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.get('*', (request, response) => {
  response.send('the route does not exist, sorry. ERROR 404');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));


