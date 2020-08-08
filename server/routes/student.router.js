const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    if(req.user.is_teacher){
    console.log('req.user:', req.user.is_teacher);
    let query = `select user_id as id, array_agg(book_title) as books, "user"."username" as username from user_book
    join "user" on "user"."id" = user_book.user_id
    where is_teacher = false
    group by user_id, "user"."username"
    ;`;
    pool.query(query)
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('Error making SELECT for user:', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(500);
    }
} 
);

router.delete('/:id', rejectUnauthenticated,(req, res) => {
    console.log('Delete request for id', req.params.id);
    console.log('Delete request for user.id', req.user.id);
    let query = 
    `DELETE FROM "user"
    WHERE id = ${req.params.id}
    ;`;
    pool.query(query)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error DELETE /student', error);
        res.sendStatus(500);
    })
});
//add a student
router.post('/', (req, res) => {

});
module.exports = router;