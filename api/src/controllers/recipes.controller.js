'use strict';

const express = require('express');
const router = express.Router();
const debug = require('debug')('cookbook:recipes');
const Recipes = require('../models/recipes.model');

const listRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipes.list();
        debug(`returning all recipes. count: ${recipes.length}`);
        res.json(recipes);
    } catch (e) {
        debug(e);
        next(e);
    }
};

const createRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipes.create(req.body);
        debug(`created recipe: ${recipe.name}`);
        res.json(recipe);
    } catch(e) {
        debug(e);
        next(e);
    }
};

const updateRecipe = async (req, res, next) => {
    try {
        await Recipes.update(req.body);
        debug(`Recipe with id of ${req.body._id} updated`);
        res.end();
    } catch (e) {
        debug(e);
        next(e);
    }
};

const getRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipes.get(id);
    
        if (!recipe) {
            debug(`recipe with id of ${id} not found`);
            return next();
        }
    
        debug(`found recipe with id of ${id}`);
        res.json(recipe);
    } catch (e) {
        debug(e);
        next(e);
    }
};

router.get('/', listRecipes);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.get('/:id', getRecipe);

module.exports = router;
