const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    let query = `SELECT * FROM user_book WHERE user_id = $1 
    AND book_title is not null
    ORDER BY book_id DESC;`;
    pool.query(query, [req.user.id])
        .then(results => res.send(results.rows))
        .catch(error => {
            res.sendStatus(500);
        });
}
);

//delete from profile
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let query =
        `DELETE FROM user_book
    WHERE book_id = $2
    AND user_id = $1;`;
    pool.query(query, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
    let query =
        `UPDATE user_book SET finish_book = true
    WHERE book_id = $2
    AND user_id = $1;`;
    pool.query(query, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
});

module.exports = router;