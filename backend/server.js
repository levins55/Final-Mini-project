const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();
require('dotenv').config();
//dotenv.config();

connectDB();
console.log(connectDB)

const app = express();  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
console.log(`In server.js ${process.env.NODE_ENV} =+=+=+=`.red.underline.bold);
if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
) {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        );
    });
}

app.use(errorHandler);

app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);
