const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Soracom = new Schema({
    clickType: Number,
    clickTypeName: String,
    batteryLevel: Number,
});

module.exports = mongoose.model('Soracom', Soracom);