const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/:id', (req, res) => {
    
});

router.post('/', (req, res) => {

});
module.exports = router;