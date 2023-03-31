const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");


/**
 * GET route, getting all offers === true, username, by id
 **/
router.get("/", rejectUnauthenticated, (req, res) => {
    console.log('getting all plants')
  const query = `SELECT "p".*, u."username" FROM "plants" p
    JOIN "user" u ON p."user_id" = u."id"
    WHERE "isOffered" = true
    AND "user_id" != $1
    ORDER BY id ASC
    ;`;
    pool
      .query(query, [req.user.id])
      .then((dbRes) => {
        res.send(dbRes.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error("GET all offers failed", err);
      });
});
 


module.exports = router;