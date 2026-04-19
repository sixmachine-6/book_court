const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const Court = require("../models/courtModel");

dotenv.config({ path: "./../config.env" });

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(console.log("db connection successfull"))
  .catch((err) => console.log(err));

const courts = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Court.create(courts.games);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Court.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
