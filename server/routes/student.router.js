const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user.id);
    let query = `Select distinct "user"."username" from user_book
    join "user" on "user"."id" = user_book.user_id
    where is_teacher = false;`;
    pool.query(query)
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('Error making SELECT for user:', error);
            res.sendStatus(500);
        });
} 
);

//add a student
router.post('/', (req, res) => {

});
module.exports = router;