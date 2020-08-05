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

router.get('/:id', (req, res) => {
    console.log('req.user:', req.user.id);
    console.log('req.body:', req.body);

    // let query = `SELECT * FROM user_book WHERE user_id = $1;`;
    // pool.query(query, [req.user.id])
    //     .then(results => res.send(results.rows))
    //     .catch(error => {
    //         console.log('Error making SELECT for secrets:', error);
    //         res.sendStatus(500);
    //     });
    // res.sendStatus(403);

});

//post quiz results/answers
router.post('/', (req, res) => {

});

//delete from profile
router.delete('/:id', (req, res) => {
    console.log('Delete request for id', req.params.id);
    console.log('Delete request for user.id', req.user.id);
    let query = 
    `DELETE FROM user_book
    WHERE book_id = ${req.params.id}
    AND user_id = ${req.user.id};`;
    pool.query(query)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error DELETE /profile', error);
        res.sendStatus(500);
    })
});

module.exports = router;