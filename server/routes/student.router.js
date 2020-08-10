const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.user.is_teacher) {
        console.log('req.user:', req.user.is_teacher);
        let query = `select user_id as id, array_agg(book_title) filter (where book_title is not null) as books, "user"."username" as username, CAST(AVG(quiz_score) as decimal(6,1))  from "user"
        full outer join "user_book" on "user"."id" = user_book.user_id
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
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
router.post('/', rejectUnauthenticated, async (req, res) => {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const is_teacher = req.body.is_teacher;
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryText = 'INSERT INTO "user" (username, password, is_teacher) VALUES ($1, $2, $3) RETURNING id';
        const result = await client.query(queryText, [username, password, is_teacher])
        const insertText = `INSERT INTO "user_book" (user_id) VALUES($1);`
        await client.query(insertText, [result.rows[0].id])
        console.log('successful add student!')
        await client.query('COMMIT')
        res.sendStatus(201)
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('error with add', error)
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

//post quiz feedback
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('PUT req.body: ', req.body);
    console.log('PUT req.user: ', req.user);
    console.log('PUT req.params: ', req.params.id);

    const feedback = req.body;
    const queryString = `UPDATE "user_book" SET
    quiz_feedback = $1, quiz_score=$2 
    WHERE book_id = ${feedback.book_id} 
    AND user_id = ${feedback.user_id};`;

    pool.query(queryString,
        [feedback.quiz_feedback, feedback.quiz_score
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