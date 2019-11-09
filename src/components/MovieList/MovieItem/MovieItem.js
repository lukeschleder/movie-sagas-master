import React, { Component } from 'react';
import { connect } from 'react-redux';

class MovieItem extends Component {

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <p>Movie Item</p>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(MovieItem);