const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.user:', req.user.id);
    let query = `SELECT * FROM quizzes`;
    pool.query(query)
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('Error making SELECT for quizzes:', error);
            res.sendStatus(500);
        });
} 
);

router.post('/', (req, res) => {

});
module.exports = router;