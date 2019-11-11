import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { HashRouter as Router, Route, Link, withRouter, Switch } from 'react-router-dom';


class MovieList extends Component {

    // takes in a single movie and dispatch's an action that will eventually return genres
    goToDetails(movie) {
        console.log('in goToDetails', movie.id);
        this.props.dispatch({ type: 'GET_GENRES', payload: movie.id })
        this.props.history.push('/details');
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
                {this.props.reduxState.movies.map((movie) => (
                    <Card key={movie.id} style={{ maxWidth: 350 }}>
                        <CardActionArea>

                            <CardMedia
                                onClick={() => (this.goToDetails(movie))}
                                style={{ height: 500 }}
                                image={movie.poster}
                                title={movie.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {movie.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={() => (this.goToDetails(movie))} size="small" color="primary">
                                Learn More
                      </Button>
                        </CardActions>
                    </Card>
                ))}
            </Grid>

        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(withRouter(MovieList));