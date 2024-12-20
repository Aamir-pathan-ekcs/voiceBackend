const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    promoCode: String
})

module.exports = mongoose.model('quizze', dataSchema);