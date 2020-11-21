'use strict';

const express = require('express');
const router = express.Router();
const debug = require('debug')('cookbook:tags');

const Tags = require('../models/tags.model');

const listTags = async (req, res, next) => {
    try {
        const { offset = 0, limit = 25, name } = req.query;
        const tags = await Tags.list({
            offset: +offset,
            limit: +limit,
            name
        });

        let logMsg = `returning tags with following criteria: offset ${offset}, limit ${limit}`;
        logMsg += name ? `, name ${name}` : '';

        debug(logMsg);
        debug(`# of tags found: ${tags.length}`)

        res.json(tags);
    } catch(e) {
        debug(e);
        next(e);
    }
};

const getTag = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tag = await Tags.get(id);
    
        if (!tag) {
            debug(`tag with id of ${id} not found`);
            return next();
        }
    
        debug(`found tag with id of ${id}`);
        res.json(tag);
    } catch (e) {
        debug(e);
        next(e);
    }
};

const createTag = async (req, res, next) => {
    try {
        const tag = await Tags.create(req.body);
        debug(`created tag: ${tag.name}`);
        res.json(tag);
    } catch(e) {
        debug(e);
        next(e);
    }
};

const updateTag = async (req, res, next) => {
    try {
        await Tags.update(req.body);
        debug(`Tag with id of ${req.body._id} updated`);
        res.end();
    } catch (e) {
        debug(e);
        next(e);
    }
};

const removeTag = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Tags.remove(id);
        debug(`Tag with id of ${id} deleted`);
        res.end();
    } catch (e) {
        debug(e);
        next(e);
    }
};

router.get('/', listTags);
router.post('/', createTag);
router.get('/:id', getTag);
router.put('/:id', updateTag);
router.delete('/:id', removeTag);

module.exports = router;
