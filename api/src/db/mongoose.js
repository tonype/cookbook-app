'use strict';

const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_URI || 'mongodb://localhost:27017/cookbook',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

module.exports = mongoose;
