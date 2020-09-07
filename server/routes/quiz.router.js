const express = require("express");
const pool = require("../modules/pool");
const { default: Axios } = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

//get quiz for specific student
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const query = `SELECT * from user_book
    WHERE finish_quiz=true AND  user_id =$1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

//PUT request that edits the quiz questions for a particular student 
//for a particular book
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const answer = req.body;
  const queryString = `UPDATE "user_book" SET
    question_1 = $1, question_2=$2, 
    question_3=$3, question_4=$4, 
    finish_quiz=$5
    WHERE book_id = $6 
    AND user_id = $7;`;

  pool
    .query(queryString, [
      answer.question_1,
      answer.question_2,
      answer.question_3,
      answer.question_4,
      answer.finish_quiz,
      answer.book_id,
      req.user.id,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
module.exports = router;
