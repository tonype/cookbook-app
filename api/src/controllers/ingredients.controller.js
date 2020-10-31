'use strict';

const express = require('express');
const router = express.Router();
const debug = require('debug')('cookbook:ingredients');

const Ingredients = require('../models/ingredients.model');

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

const updateIngredient = async (req, res, next) => {
    try {
        await Ingredients.update(req.body);
        debug(`ingredient with id of ${req.body._id} updated`);
        res.end();
    } catch (e) {
        debug(e);
        next(e);
    }
};

const removeIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Ingredients.remove(id);
        debug(`ingredient with id of ${id} deleted`);
        res.end();
    } catch (e) {
        debug(e);
        next(e);
    }
};

router.get('/', listIngredients);
router.post('/', createIngredient);
router.get('/:id', getIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', removeIngredient);

module.exports = router;
