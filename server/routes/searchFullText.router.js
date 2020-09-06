const express = require("express");
const pool = require("../modules/pool");
const { default: Axios } = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  Axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&key=${process.env.API_KEY}&fields=items/accessInfo/webReaderLink, items/volumeInfo(title, authors, description, imageLinks/thumbnail)&orderBy=relevance
  `
  )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const book = req.body;
  const queryString = `INSERT INTO "user_book" 
    ("user_id", "book_title", "book_authors", "book_image", "book_description", "book_text")
        VALUES ( $1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryString, [
      req.user.id,
      book.volumeInfo.title,
      book.volumeInfo.authors[0],
      book.volumeInfo.imageLinks.thumbnail,
      book.volumeInfo.description,
      book.accessInfo.webReaderLink,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
module.exports = router;
