if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const initData = require("./data.js");
const axios = require("axios");

// Use the SAME database your live app connects to (set in your .env
// as ATLASDB_URL) instead of a hardcoded local Mongo instance.
const MONGO_URL = process.env.ATLASDB_URL;

if (!MONGO_URL) {
  console.log(
    "ATLASDB_URL is not set. Make sure you have a .env file in your project root with ATLASDB_URL=<your-connection-string>, matching what app.js uses."
  );
  process.exit(1);
}

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

  // Instead of a hardcoded placeholder owner ID, grab a real user from
  // your database so every seeded listing has a valid, existing owner.
  const someUser = await User.findOne({});

  if (!someUser) {
    console.log(
      "No users found in the database. Sign up for an account on your site first (via /signup), then re-run this script."
    );
    process.exit(1);
  }

  console.log(`Assigning all seeded listings to user: ${someUser.username}`);

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
      owner: someUser._id,
      geometry: geometry
    });

    // small delay so Nominatim doesn't block requests
    await new Promise(r => setTimeout(r, 1000));
  }

  await Listing.insertMany(newData);

  console.log("Data was initialized");
  process.exit(0);
};

initDB();