const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const uri =
  "mongodb+srv://sr8888034:UC0IPrgeOMUQ1ZFM@cluster0.ujxvvnl.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("connection error:", err));

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
