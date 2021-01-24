const axios = require("axios");

const appRoutes = (app) => {
  const database = {
    cities: ["Boston", "Atlanta"],
  };

  app.get("/api/cities", (req, res) => {
    res.send(database.cities);
  });

  app.put("/api/cities/:city", (req, res) => {
    let { city } = req.params;
    if (
      database.cities
        .map((c) => c.toUpperCase())
        .indexOf(city.toUpperCase()) === -1
    ) {
      database.cities.push(city);
      res.status(201).send({ serverStatus: `${city} is added to the list` });
    } else {
      res.status(409).send({ serverStatus: `${city} already present` });
    }
  });

  app.delete("/api/cities", (req, res) => {
    database.cities = [];
    res.status(200).send({ serverStatus: "Recent searches cleaned" });
  });

  app.get("/api/weather/:city", async (req, res) => {
    let { city } = req.params;
    console.log("Searching for city", city);
    let { latt, longt } = (
      await axios.get(
        `https://geocode.xyz/${city}?json=1&auth=610405802004470916946x35671`
      )
    ).data;
    if (latt !== "0.00000" && longt !== "0.00000") {
      let { current, daily } = (
        await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${longt}&exclude=minutely,hourly,alerts&appid=d8cebcf8331bd9f62eee21d496dc4a09&units=imperial`
        )
      ).data;
      res.status(200).send({ current : {...current, city}, daily });
    } else {
      res.status(501).send({ serverStatus: "Weather data not found for the city" });
    }
  });
};

module.exports = appRoutes;
