'use strict';

const express = require('express');
const router = express.Router();
const debug = require('debug')('cookbook:units');

const Units = require('../models/units.model');

const listUnits = async (req, res, next) => {
    try {
        const units = await Units.list();
        debug(`returning all units. count: ${units.length}`);
        res.json(units);
    } catch(e) {
        debug(e);
        next(e);
    }
};

const getUnit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const unit = await Units.get(id);
    
        if (!unit) {
            debug(`unit with id of ${id} not found`);
            return next();
        }
    
        debug(`found unit with id of ${id}`);
        res.json(unit);
    } catch (e) {
        debug(e);
        next(e);
    }
};

const createUnit = async (req, res, next) => {
    try {
        const unit = await Units.create(req.body);
        debug(`created unit: ${unit.name}`);
        res.json(unit);
    } catch(e) {
        debug(e);
        next(e);
    }
};

const updateUnit = async (req, res, next) => {
    try {
        await Units.update(req.body);
        debug(`Unit with id of ${req.body._id} updated`);
        res.end();
    } catch (e) {
        debug(e);
        next(e);
    }
};

const removeUnit = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Units.remove(id);
        debug(`Unit with id of ${id} deleted`);
        res.end();
    } catch (e) {
        debug(e);
        next(e);
    }
};

router.get('/', listUnits);
router.post('/', createUnit);
router.get('/:id', getUnit);
router.put('/:id', updateUnit);
router.delete('/:id', removeUnit);

module.exports = router;
