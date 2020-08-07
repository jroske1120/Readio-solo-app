const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    if(req.user.is_teacher){
    console.log('req.user:', req.user.is_teacher);
    let query = `Select * from "user"
    where is_teacher = false;`;
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

//add a student
router.post('/', (req, res) => {

});
module.exports = router;