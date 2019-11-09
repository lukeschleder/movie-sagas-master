import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

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
        <p>Empty Page</p>
        <pre>{JSON.stringify(this.props.reduxState)}</pre>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(App);
