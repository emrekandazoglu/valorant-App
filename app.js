const express = require('express');
const userRoutes = require("./routes/user");
const app = express();

app.set("view engine", "ejs");
const path = require('path');

app.use(express.static('public')); // Public klasörünü statik hale getir

app.use(userRoutes);

app.listen(4000, () => {
    console.log("4000 portunda çalışıyor");
    console.log("4000 portunda");
});