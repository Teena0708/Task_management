const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.mongoURL);
app.use(express.json());
const taskRoute = require("./router/taskRoute");
app.use("/",taskRoute);
