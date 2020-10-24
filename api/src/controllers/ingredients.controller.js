'use strict';

const express = require('express');
const router = express.Router();
const debug = require('debug')('cookbook:ingredients');

const Ingredients = require('../models/ingredients');

const listIngredients = async (req, res, next) => {
    try {
        const ingredients = await Ingredients.list();
        debug(`returning all ingredients. count: ${ingredients.length}`);
        res.json(ingredients);
    } catch(e) {
        debug(e);
        next(e);
    }
};

const getIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ingredient = await Ingredients.get(id);
    
        if (!ingredient) {
            debug(`ingredient with id of ${id} not found`);
            return next();
        }
    
        debug(`found ingredient with id of ${id}`);
        res.json(ingredient);
    } catch (e) {
        debug(e);
        next(e);
    }
};

const createIngredient = async (req, res, next) => {
    try {
        const ingredient = await Ingredients.create(req.body);
        debug(`created ingredient: ${ingredient.name}`);
        res.json(ingredient);
    } catch(e) {
        debug(e);
        next(e);
    }
};

router.get('/', listIngredients);
router.post('/', createIngredient);
router.get('/:id', getIngredient);

module.exports = router;
