const mongoose = require('mongoose');

const CocktailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    ice: {
        type: String,
        required: true,
    },
    glassware: {
        type: String,
        required: true,
    },
    garnish: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: false,
        },
        coordinates: {
            type: [Number],
            required: false,
        },
    imageSrc: {
        type: String,
        required: false,
    }
    },
});

module.exports = mongoose.model('cocktails', CocktailSchema);
