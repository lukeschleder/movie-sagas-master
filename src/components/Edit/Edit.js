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
        console.log('in changeTitleAndDescription', movie.movie_id);
        this.props.dispatch({ type: 'EDIT_MOVIE', payload: { id: movie.movie_id, ...this.state } })
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
                wrap='wrap'
                alignContent='space-around'
                justify='center'
            >
                {this.props.reduxState.genres.map((movie) => (
                    <Card key={movie.id} style={{ maxWidth: 600 }}>
                        <CardActions>

                            <TextField
                                onChange={this.inputTitle}
                                id="standard-basic"
                                label="Edit Movie Title"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                onChange={this.inputDescription}
                                label="Edit Movie Description"
                                multiline
                                rows="8"
                                fullWidth
                                defaultValue=""
                                margin="normal"
                                variant="outlined"
                                placeholder="Describe this movie"
                            />
                            <Button onClick={() => (this.goBackToDetails())} size="small" color="primary">
                                Cancel
                      </Button>
                            <Button onClick={() => (this.changeTitleAndDescription(movie, this.state))} size="small" color="primary">
                                Save
                      </Button>
                        </CardActions>
                    </Card>
                ))}
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            </Grid>



        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(withRouter(Edit));