'use strict';

const db = require('../db');
const cuid = require('cuid');

const Recipe = db.model('Recipe', {
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
const list = async () => {
    return await Recipe.find({})
        .populate('ingredients.details')
        .populate('ingredients.unit');
};
const get = async (_id) => {
    return await Recipe.findById(_id)
        .populate('ingredients.details')
        .populate('ingredients.unit');
};

module.exports = {
    create,
    list,
    get,
    model: Recipe
};
