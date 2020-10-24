'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nocache = require('nocache');
const debug = require('debug')('cookbook:startup');
const controllers = require('./controllers');
const middleware = require('./middleware');

const port = process.env.PORT || 9876;
const app = express();

debug('Cookbook API starting...');

app.use(nocache());
app.use(morgan(':date[iso] :remote-addr :method :url :req[content-length] :status :response-time ms - :res[content-length]'));
app.use(middleware.cors);
app.use(bodyParser.json());

app.use('/flash', controllers.flash);
app.use('/recipes', controllers.recipes);
app.use('/ingredients', controllers.ingredients);
app.use('/units', controllers.units);

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => {
    debug(`Cookbook API listening on port ${port}`);
});
