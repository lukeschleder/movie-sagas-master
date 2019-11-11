import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core';
import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom';


class Edit extends Component {

    state = {
        title: '',
        description: '',
    }
    // sets description in local state
    inputDescription = (event) => {
        this.setState({
            ...this.state,
            description: event.target.value,
        });
    }


    // sets title in local state
    inputTitle = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }
    // changes movies database and then refreshes genres reduxer with new information 
    // and takes you back to details page
    changeTitleAndDescription(movie, state) {
        if ( state.title === '' || state.description === ''){
            alert("Please edit completely")
        console.log('in changeTitleAndDescription', movie.movie_id);
        } else this.props.dispatch({ type: 'EDIT_MOVIE', payload: { id: movie.movie_id, ...this.state } })
        this.props.history.push('/details')

    }

    // takes you back to details page when cancel is clicked
    goBackToDetails() {
        console.log('in goBackToDetails');
        this.props.history.push('/details')
    }

    // Renders the entire app on the DOM
    render() {
        return (

            <Grid
                container
                spacing = {3}
                wrap='wrap'
                alignContent='space-around'
                justify='center'
            >
                {this.props.reduxState.genres.map((movie) => (
                    <Grid 
                    item
                    sm={4}
                    key={movie.id}>
                    <Card  style={{ maxWidth: 600 }}>
                        <CardContent>
                            <div>
                            <TextField
                                onChange={this.inputTitle}
                                id="standard-basic"
                                defaultValue={movie.title}
                                label="Edit Movie Title"
                                margin="normal"
                                fullWidth
                            /></div>
                            <div>
                            <TextField
                                onChange={this.inputDescription}
                                label="Edit Movie Description"
                                defaultValue={movie.description}
                                multiline
                                rows="15"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                placeholder="Describe this movie"
                            /></div>
                            <div><Button onClick={() => (this.goBackToDetails())} size="small" color="primary">
                                Cancel
                      </Button></div>
                            <div><Button onClick={() => (this.changeTitleAndDescription(movie, this.state))} size="small" color="primary">
                                Save
                      </Button></div>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                {/* <pre>{JSON.stringify(this.props.reduxState, null, 2)}</pre> */}
            </Grid>



        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(withRouter(Edit));