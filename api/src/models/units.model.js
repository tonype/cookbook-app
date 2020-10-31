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
    async (document) => dbHooks.removeRecipeRelationship(document, 'ingredients.unit')
);

const Unit = mongoose.model('Unit', schema);

const get = async (_id) => await Unit.findById(_id);
const create = async (unit) => await Unit.create(unit);
const list = async () => await Unit.find();
const update = async (unit) => {
    return await Unit.replaceOne(
        { _id: unit._id }, unit
    );
};
const remove = async (id) => await Unit.findOneAndDelete({ _id: id });

module.exports = {
    get,
    create,
    list,
    update,
    remove,
    model: Unit
};
