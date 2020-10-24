'use strict';

const db = require('../db');
const cuid = require('cuid');

const Unit = db.model('Unit', {
    _id: { type: String, default: cuid },
    name: { 
        type: String,
        required: true,
        index: true
    }
});

const create = async (unit) => await Unit.create(unit);
const list = async () => await Unit.find();

module.exports = {
    create,
    list,
    model: Unit
};
