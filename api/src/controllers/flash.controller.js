'use strict';

const express = require('express');
const router = express.Router();

// Send back beer and tada emojis for thunder.
router.get('/', (req, res) => res.send('thunder &#127867; &#127881;'));

module.exports = router;
