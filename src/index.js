import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import { takeEvery, put } from 'redux-saga/effects';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', firstSaga);
    yield takeEvery('GET_GENRES', secondSaga);
    yield takeEvery('EDIT_MOVIE', thirdSaga);
}

// List of saga functions
// gets movies
function* firstSaga(action) {
    try {
        const moviesResponse = yield axios.get('/movies');
        yield put({ type: 'SET_MOVIES', payload: moviesResponse.data });
    } catch (error) {
        console.log('error fetching movies', error);

    }
}
// gets genres with single movie info
function* secondSaga(action) {
    console.log(action.payload);
    try {
        const genreResponse = yield axios.get(`movies/details/${action.payload}`);
        console.log(genreResponse);

        yield put({ type: 'SET_GENRES', payload: genreResponse.data });
    } catch (error) {
        console.log('error fetching genres', error);
    }
}
// updates movie with new title and description
function* thirdSaga(action) {
    console.log(action.payload);

    try {
        const updatedMovies = yield axios.put(`movies/edit/${action.payload.id}`, { title: action.payload.title, description: action.payload.description });
        console.log(updatedMovies);
        yield put({ type: 'GET_GENRES', payload: action.payload.id })
        yield put({ type: 'GET_MOVIES' })
    }
    catch (error) {
        console.log('error modifying title and description', error);

    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
