require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// TODO: Routes
app.use('/api/auth', require('./routes/auth'))

app.get("/", (req, res) => {
    res.send("KanbanSync API is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});