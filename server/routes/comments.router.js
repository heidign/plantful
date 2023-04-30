const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const forbidden = new Error("User is not authenticated");
forbidden.code = 403;


// * GET children comments by parent id

router.get("/children/:id", rejectUnauthenticated, (req, res) => {
  const getChildrenQuery = `
    SELECT c.*, u.username, u.avatar_image,
    EXISTS (SELECT parent_id from "comments" 
    WHERE parent_id = c.id) AS has_children
    FROM "comments" c
    JOIN "user" u on u.id = c.user_id
    WHERE parent_id = $1 
    ORDER BY created_at ASC
    ;`;
  pool
    .query(getChildrenQuery, [req.params.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error("GET children comments failed", err);
    });
});


// * GET threads (base/parent comments) on plant

router.get("/:id", rejectUnauthenticated, (req, res) => {
const getThreadsQuery = `
  SELECT c.*, u.username, u.avatar_image,
  EXISTS (SELECT parent_id from "comments" 
  WHERE parent_id = c.id) AS has_children
  FROM "comments" c 
  JOIN "user" u on u.id = c.user_id 
  WHERE path='' AND plant_id = $1
  ORDER BY created_at ASC 
  LIMIT 10
  ;`;
  pool
    .query(getThreadsQuery, [req.params.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error("GET all threads failed", err);
    });
});


// * POST comments on plant

router.post("/", rejectUnauthenticated, async (req, res) => {
  const { plant_id, parent_id, comment } = req.body;
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");
    const result = await connection.query(`
    INSERT INTO comments (created_at, updated_at, plant_id, user_id, parent_id, comment)
    VALUES (NOW(), NOW(), $1, $2, $3, $4) 
    RETURNING *
    ;`,
      [plant_id, req.user.id, parent_id, comment]
    );

    let pathQuery = `
        WITH RECURSIVE comments_cte (id, path) 
        AS (SELECT c.id,''
        FROM "comments" c
        WHERE parent_id IS NULL
        UNION ALL
        SELECT r.id, concat(comments_cte.path, '.', r.parent_id)
        FROM "comments" r
        JOIN comments_cte ON comments_cte.id = r.parent_id)
        SELECT path
        FROM comments_cte
        WHERE id = $1
       ;`;
    const pathResponse = await connection.query(pathQuery, [result.rows[0].id]);
    const path = pathResponse.rows[0].path.substr(1);
    result.rows[0].path = path;
    // Making new query to set path (ltree type) for reply
    const updateQuery = `UPDATE comments SET path = $1 WHERE id = $2;`;
    const updateResponse = await connection.query(updateQuery, [path, result.rows[0].id]);
    await connection.query("COMMIT");
    res.send(result.rows[0]);
  } catch (err) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back transfer`, err);
    res.sendStatus(500).json({ message: "Error occurring with comments." });
  } finally {
    connection.release();
    res.end();
  }
});

module.exports = router;
