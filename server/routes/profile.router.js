const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();




router.get('/', rejectUnauthenticated, (req, res) => {
        console.log('req.user:', req.user.id);
        let query = `SELECT * FROM user_book WHERE user_id = $1;`;
        pool.query(query, [req.user.id])
            .then(results => res.send(results.rows))
            .catch(error => {
                console.log('Error making SELECT for secrets:', error);
                res.sendStatus(500);
            });
    } 
);

//post quiz results/answers
router.post('/', (req, res) => {

});

//delete from profile
router.delete('/:id', rejectUnauthenticated,(req, res) => {
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

router.put('/:id', rejectUnauthenticated,(req, res) => {
    console.log('Delete request for id', req.params.id);
    console.log('Delete request for user.id', req.user.id);
    let query = 
    `UPDATE user_book SET finish_book = true
    WHERE book_id = ${req.params.id}
    AND user_id = ${req.user.id};`;
    pool.query(query)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error PUT /profile', error);
        res.sendStatus(500);
    })
});

// router.put('/unfinish/:id', rejectUnauthenticated,(req, res) => {
//     console.log('Delete request for id', req.params.id);
//     console.log('Delete request for user.id', req.user.id);
//     let query = 
//     `UPDATE user_book SET finish_book = false
//     WHERE book_id = ${req.params.id}
//     AND user_id = ${req.user.id};`;
//     pool.query(query)
//     .then((result) => {
//         res.send(result.rows);
//     }).catch((error) => {
//         console.log('Error PUT /profile', error);
//         res.sendStatus(500);
//     })
// });
module.exports = router;