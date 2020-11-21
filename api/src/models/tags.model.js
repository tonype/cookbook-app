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
    async (document) => dbHooks.removeRecipeRelationship(document, 'tags')
);

const Tag = mongoose.model('Tag', schema);

const get = async (_id) => await Tag.findById(_id);
const create = async (tag) => await Tag.create(tag);
const list = async (options = {}) => {
    const { offset = 0, limit = 25, name } = options;
    const query = name ? { name : { $regex: new RegExp(name, 'i') } } : {};
    return await Tag.find(query)
        .skip(offset)
        .limit(limit);
};
const update = async (tag) => {
    return await Tag.replaceOne(
        { _id: tag._id }, tag
    );
};
const remove = async (_id) => await Tag.findOneAndDelete({ _id });

module.exports = {
    get,
    create,
    list,
    update,
    remove,
    model: Tag
};
