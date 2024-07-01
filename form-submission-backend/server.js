const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/formDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const FormData = mongoose.model("FormData", formSchema);

app.post("/api/form", async (req, res) => {
  try {
    const newFormData = new FormData(req.body);
    const savedData = await newFormData.save();
    res.status(200).send(savedData);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/form", async (req, res) => {
  try {
    const data = await FormData.find({});
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});