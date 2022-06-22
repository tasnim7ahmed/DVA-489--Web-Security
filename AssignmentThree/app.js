const express = require('express')
const path = require('path')
const app = express()

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const Routes = require("./routes");
app.use(Routes);

module.exports = app