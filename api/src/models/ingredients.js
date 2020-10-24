'use strict';

const db = require('../db');
const cuid = require('cuid');

const Ingredient = db.model('Ingredient', {
    _id: { type: String, default: cuid },
    name: { 
        type: String,
        required: true,
        index: true
    }
});

const get = async (_id) => await Ingredient.findById(_id);
const create = async (ingredient) => await Ingredient.create(ingredient);
const list = async () => await Ingredient.find();

module.exports = {
    get,
    create,
    list,
    model: Ingredient
};
