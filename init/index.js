const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const axios = require("axios");

const MONGO_URL = "mongodb://127.0.0.1:27017/wander";

main()
.then(() => {
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  let newData = [];

  for (let obj of initData.data) {

    let geometry = {
      type: "Point",
      coordinates: [77.5946, 12.9716] // fallback
    };

    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: `${obj.location}, ${obj.country}`,
            format: "json",
            limit: 1
          },
          headers: {
            "User-Agent": "wanderlust-app"
          }
        }
      );

      if (res.data.length > 0) {
        geometry = {
          type: "Point",
          coordinates: [
            parseFloat(res.data[0].lon),
            parseFloat(res.data[0].lat)
          ]
        };
      }

    } catch (err) {
      console.log("Geocoding failed:", obj.location);
    }

    newData.push({
      ...obj,
      owner: "69a87ab287a38e4ee41b1e3a",
      geometry: geometry
    });

    // small delay so Nominatim doesn't block requests
    await new Promise(r => setTimeout(r, 1000));
  }

  await Listing.insertMany(newData);

  console.log("Data was initialized");
};

initDB();