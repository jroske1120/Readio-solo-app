const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

console.log('api key', process.env.API_KEY);

router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('req.user:', req.user.id);
        let query = `SELECT * FROM user_book WHERE user_id = $1;`;
        pool.query(query, [req.user.id])
            .then(results => res.send(results.rows))
            .catch(error => {
                console.log('Error making SELECT for secrets:', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);

    }
});

router.post('/', (req, res) => {
    
});
module.exports = router;