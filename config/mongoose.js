//db.js
require('dotenv').config();

const mongoose = require('mongoose')

 const url = process.env.URL;


module.exports = url;