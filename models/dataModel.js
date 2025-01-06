const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    promo: String
})

module.exports = mongoose.model('quizze', dataSchema);