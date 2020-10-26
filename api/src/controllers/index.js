'use strict';

const flash = require('./flash.controller');
const recipes = require('./recipes.controller');
const ingredients = require('./ingredients.controller');
const units = require('./units.controller');
const tags = require('./tags.controller');

module.exports = {
    flash,
    recipes,
    ingredients,
    units,
    tags
};
