const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user.id);
    console.log('req.params.id:', req.params.id);
    const query = `select * from user_book
    WHERE book_id = $2
    AND user_id = $1;`;
    pool.query(query, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error making SELECT for details:', error);
            res.sendStatus(500);
        });
});

module.exports = router;