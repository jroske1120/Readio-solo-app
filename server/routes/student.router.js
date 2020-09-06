const express = require("express");
const pool = require("../modules/pool");
const { default: Axios } = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  if (req.user.is_teacher) {
    let query = `SELECT user_id AS id, 
        array_agg(book_title) FILTER (WHERE book_title IS NOT NULL) AS books, 
        "user"."username" AS username, 
        CAST(AVG(quiz_score) AS decimal(6,1)), 
        array_agg(finish_quiz) FILTER (WHERE finish_quiz = true AND quiz_score IS NULL) as grade 
        FROM "user"
        FULL OUTER JOIN "user_book" ON "user"."id" = user_book.user_id
        WHERE is_teacher = false
        GROUP BY user_id, "user"."username"
        ;`;
    pool
      .query(query)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(500);
  }
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
 const query = `DELETE FROM "user"
    WHERE id = $1 
    ;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});
//add a student
router.post("/", rejectUnauthenticated, async (req, res) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const is_teacher = req.body.is_teacher;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `INSERT INTO "user" (username, password, is_teacher) 
        VALUES ($1, $2, $3) RETURNING id`;
    const result = await client.query(queryText, [
      username,
      password,
      is_teacher,
    ]);
    const insertText = `INSERT INTO "user_book" (user_id) VALUES($1);`;
    await client.query(insertText, [result.rows[0].id]);
    await client.query("COMMIT");
    res.sendStatus(201);
  } catch (error) {
    await client.query("ROLLBACK");
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

//post quiz feedback
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const feedback = req.body;
  const queryString = `UPDATE "user_book" SET
    quiz_feedback = $1, quiz_score=$2 
    WHERE book_id = $3
    AND user_id = $4;`;
  pool
    .query(queryString, [
      feedback.quiz_feedback,
      feedback.quiz_score,
      feedback.book_id,
      feedback.user_id,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
module.exports = router;
