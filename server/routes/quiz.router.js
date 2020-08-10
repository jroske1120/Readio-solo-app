const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
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
//get quiz for specific student
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user.id);
    console.log('req.params.id:', req.params.id);
    const query = `SELECT * from user_book
    WHERE finish_quiz=true AND  user_id =${req.params.id};`;
    pool.query(query)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error making SELECT for quiz:', error);
            res.sendStatus(500);
        });
});

//post quiz answers
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('PUT req.body: ', req.body);
    console.log('PUT req.user: ', req.user);
    console.log('PUT req.params: ', req.params.id);

    const answer = req.body;
    const queryString = `UPDATE "user_book" SET
    question_1 = $1, question_2=$2, 
    question_3=$3, question_4=$4, 
    finish_quiz=$5
    WHERE book_id = ${answer.book_id} 
    AND user_id = ${req.user.id};`;

    pool.query(queryString,
        [answer.question_1, answer.question_2, 
        answer.question_3, answer.question_4, 
        answer.finish_quiz
        ]).then((result) => {
            // success
            console.log("PUT successful")
            res.send(result.rows);
        }).catch((err) => {
            // failure
            console.log("----->Error in PUT:", err);
            res.sendStatus(500)
        })
});
module.exports = router;