const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route 
 */
router.get('/', (req, res) => {
  const query = `
  SELECT * FROM "plants";
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

/**
 * POST route 
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;