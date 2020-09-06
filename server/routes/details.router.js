const express = require("express");
const pool = require("../modules/pool");
const { default: Axios } = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const query = `select * from user_book
    WHERE book_id = $2
    AND user_id = $1;`;
  pool
    .query(query, [req.user.id, req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  let query = `UPDATE user_book SET student_rating = $1 
        WHERE user_id = $2 AND
        book_id = $3;`;
  pool
    .query(query, [req.body.student_rating, req.user.id, req.body.item.book_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
