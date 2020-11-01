'use strict';

const mongoose = require('../db/mongoose');
const cuid = require('cuid');

const Recipe = mongoose.model('Recipe', {
    _id: { type: String, default: cuid },
    name: { 
        type: String,
        required: true
    },
    prepTime: { 
        type: Number,
        required: true
    },
    cookTime: { 
        type: Number,
        required: true
    },
    createdOn: {
        type: Number,
        default: Date.now
    },
    foundFrom: String,
    notes: String,
    tags: {
        type: [{
            type: String,
            ref: 'Tag',
            index: true
        }]
    },
    description: { 
        type: String,
        required: true
    },
    ingredients: {
        type: [{
            qty: { type: Number, required: true },
            unit: { 
                type: String,
                ref: 'Unit',
                required: true
            },
            details: {
                type: String,
                ref: 'Ingredient',
                index: true,
                required: true
            }
        }]
    },
    directions: {
        type: [{
            step: { type: Number, required: true },
            detail: { type: String, required: true }
        }]
    }
});

const create = async (recipe) => await Recipe.create(recipe);
const update = async (recipe) => {
    return await Recipe.replaceOne(
        { _id: recipe._id }, recipe
    );
};

// TODO: DRY up these populates.
const list = async () => {
    return await Recipe.find({})
        .populate('tags')
        .populate('ingredients.details')
        .populate('ingredients.unit');
};
const get = async (_id) => {
    return await Recipe.findById(_id)
        .populate('tags')
        .populate('ingredients.details')
        .populate('ingredients.unit');
};

module.exports = {
    create,
    update,
    list,
    get,
    model: Recipe
};
