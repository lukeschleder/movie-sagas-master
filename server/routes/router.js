const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {

  // SQL Query to return all movies
  const query = 'SELECT * FROM movies;';

  pool.query(query)
    .then((response) => {
      console.log('SELECT ALL movies response', response);
      res.send(response.rows)
    })
    .catch((error) => {
      console.log('SELECT ALL favorites error', error);
      res.sendStatus(500);
    })
});

router.get('/details/:id', (req, res) => {

  // SQL Query to return genre and single movie info when id = $1
  const query = `SELECT *
          FROM "movies"
          JOIN "movies_genres" ON "movies"."id"="movies_genres"."movie_id"
          JOIN "genres" ON "genres"."id"="movies_genres"."genre_id"
          WHERE "movies"."id" =$1;`;

  pool.query(query, [req.params.id])
    .then((response) => {
      console.log('SELECT ALL genres response', response);
      res.send(response.rows)
    })
    .catch((error) => {
      console.log('SELECT ALL favorites error', error);
      res.sendStatus(500);
    })
});

// update given movie with new title and description
router.put('/edit/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const updatedMovie = req.body;
  const queryText = `UPDATE movies
  SET 
  title = $1,
  description = $2
  WHERE "id" = $3;`;

  const queryValues = [
    updatedMovie.title,
    updatedMovie.description,
    req.params.id,
  ];
  pool.query(queryText, queryValues)
    .then((response) => {
      console.log('favorites category PUT response', response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('favorites category PUT error', error);
      res.sendStatus(500);
    })
});

module.exports = router;