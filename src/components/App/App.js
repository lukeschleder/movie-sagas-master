import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details'
import Edit from '../Edit/Edit'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

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
      <Router>
      <div className="App">
        <h2>Movies</h2>
        <Route exact path="/" exact component={MovieList} />
        <Switch><Route exact path="/details" exact component={Details} /></Switch>
        <Route exact path="/edit" exact component={Edit} />
        <pre>{JSON.stringify(this.props.reduxState.movies)}</pre>
        <pre>{JSON.stringify(this.props.reduxState.genres)}</pre>
      </div>
      </Router>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(App);
