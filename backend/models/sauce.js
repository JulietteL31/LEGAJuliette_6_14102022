/*CONSTANTES*/
const mongoose = require('mongoose');

/*SCHEMA*/
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String },
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLikes: { type: [String] },
    usersDislikes: { type: [String] }
});

/*EXPORTATION*/
module.exports = mongoose.model('Sauce', sauceSchema);