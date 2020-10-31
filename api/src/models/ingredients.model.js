'use strict';

const mongoose = require('../db/mongoose');
const cuid = require('cuid');
const dbHooks = require('../db/hooks');

const schema = new mongoose.Schema({
    _id: { type: String, default: cuid },
    name: { 
        type: String,
        required: true,
        index: true
    }
});

schema.post(
    'findOneAndDelete', 
    async (document) => dbHooks.removeRecipeRelationship(document, 'ingredients.details')
);

const Ingredient = mongoose.model('Ingredient', schema);

const get = async (_id) => await Ingredient.findById(_id);
const create = async (ingredient) => await Ingredient.create(ingredient);
const list = async () => await Ingredient.find();
const update = async (ingredient) => {
    return await Ingredient.replaceOne(
        { _id: ingredient._id }, ingredient
    );
};
const remove = async (id) => await Ingredient.findOneAndDelete({ _id: id });

module.exports = {
    get,
    create,
    list,
    update,
    remove,
    model: Ingredient
};
