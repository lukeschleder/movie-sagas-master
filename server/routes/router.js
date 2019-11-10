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

  // SQL Query to return all movies
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

// update given favorite with a category id
router.put('/edit/:Id', (req, res) => {
  console.log(req.body);
  console.log(req.params);
  
  const updatedMovie = req.body;

  // req.body should contain a category_id to add to this favorite image

  // SQL Query to modify the catergories table with $1 = favID
  const query = '';

  pool.query(query, [req.params.Id])
    .then((response) => {
      console.log('favorites category PUT response', response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('favorites category PUT error', error);
      res.sendStatus(500);
    })
});

// add a new favorite 
router.post('/', (req, res) => {
  const newFav = req.body;
  // SQL Query to add a new favorite to table
  const query = '';

  const queryValues = [
    newFav.title,
    newFav.url,
  ];

  pool.query(query, queryValues)
    .then((response) => {
      console.log('POST new favorite response', respons);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('POST new favorite error', error);
      res.sendStatus(500);
    })
});

// delete a favorite
router.delete('/:id', (req, res) => {
  // SQL Query to delete a favorite by id where $1=id
  const query = '';

  pool.query(query, req.params.id)
    .then((response) => {
      console.log('favorites DELETE response', response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('favorites DELETE error', error);
      res.sendStatus(500);
    })
});

module.exports = router;