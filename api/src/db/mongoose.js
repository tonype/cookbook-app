'use strict';

const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_URI || 'mongodb://localhost:27017/cookbook',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo: ', err);
});

module.exports = mongoose;
