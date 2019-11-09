import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MovieList from '../MovieList/MovieList'

class App extends Component {

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    this.props.dispatch({type: 'GET_MOVIES'})
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <p>Movies</p>
        <MovieList/>
        <pre>{JSON.stringify(this.props.reduxState.movies)}</pre>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(App);
