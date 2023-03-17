const express = require('express');
const pool = require('../modules/pool');
const axios = require("axios");
const router = express.Router();

// INJECT ENV VARIABLES
require("dotenv").config();

/**
 * GET route 
 **/
router.get('/', (req, res) => {
  const query = `
  SELECT * FROM "plants"
  JOIN "user" ON "user".id = "user_id";
  `
  pool.query(query)
    .then((dbRes) => {
    res.send(dbRes.rows);
  })
  .catch((err) => {
    res.sendStatus(500);
    console.error('GET all plants failed', err);
  })
});


module.exports = router;