const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

console.log('api key', process.env.API_KEY);

router.get('/:id', (req, res) => {
    console.log('req.user:', req.user.id);
    console.log('req.params.id:', req.params.id);
    const query = `select * from user_book
    WHERE book_id = ${req.params.id};`;
    pool.query(query)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error making SELECT for details:', error);
            res.sendStatus(500);
        });

});

router.post('/', (req, res) => {

});
module.exports = router;