'use strict';

const db = require('../db');
const cuid = require('cuid');
const dbHooks = require('./db-hooks');

const schema = new db.Schema({
    _id: { type: String, default: cuid },
    name: { 
        type: String,
        required: true,
        index: true
    }
});

/**
 * Hooks
 * post - findOneAndDelete: remove all Recipe Ingredient associations upon Ingredient delete.
 */
schema.post(
    'findOneAndDelete', 
    async (document) => dbHooks.removeRecipeIngredientRelationship(document, 'ingredients.details')
);

const Ingredient = db.model('Ingredient', schema);

const get = async (_id) => await Ingredient.findById(_id);
const create = async (ingredient) => await Ingredient.create(ingredient);
const list = async () => await Ingredient.find();
const update = async (ingredient) => {
    return await Ingredient.replaceOne(
        { _id: ingredient.id }, ingredient
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
