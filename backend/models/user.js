/*CONSTANTES*/
const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

/*SCHEMA*/
const userSchema = mongoose.Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true}
});

/*PLUG OUTIL UNIQUE VALIDATOR*/
userSchema.plugin(validator);

/*EXPORTATION DU MODELE*/
module.exports = mongoose.model('User', userSchema);