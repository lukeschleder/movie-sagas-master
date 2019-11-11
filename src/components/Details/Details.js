import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom';


class Details extends Component {
    // goes back to home
    goToMovieList() {
        console.log('in goToMovieList');
        this.props.history.push('/');

    }

    // goes to edit page
    goToEdit() {
        console.log('in goToEdit');
        this.props.history.push('/edit');
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
                    <Card key={movie.id} style={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                onClick={this.goToDetails}
                                title={movie.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {movie.title}
                                </Typography>
                                <Typography gutterBottom variant="h7" component="h2">
                                    Genre: {movie.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {movie.description}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={() => (this.goToMovieList())} size="small" color="primary">
                                Back
                      </Button>
                            <Button onClick={() => (this.goToEdit())} size="small" color="primary">
                                Edit
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

export default connect(mapReduxStateToProps)(withRouter(Details));