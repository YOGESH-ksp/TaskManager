const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.error("Error connecting to the database", err);
});