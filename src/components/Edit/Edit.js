import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core';
import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom';


class Edit extends Component {

    state = {
        title: '',
        description: '',
    }

    inputDescription = (event) => {
        this.setState({
            ...this.state,
            description: event.target.value,
        });
    }



    inputTitle = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }

    changeTitleAndDescription(movie, state) {
        console.log('in changeTitleAndDescription', movie.movie_id);
        this.props.dispatch({ type: 'EDIT_MOVIE', payload:{id:movie.movie_id,...this.state}})
        this.props.history.push('/details')

    }


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
                    <Card key={movie.id}style={{maxWidth: 400}}>
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
                        
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <Button onClick={() => (this.goBackToDetails())} size="small" color="primary">
                    Cancel
                      </Button>
                <Button onClick={() => (this.changeTitleAndDescription(movie, this.state))} size="small" color="primary">
                    Save
                      </Button>
                      <TextField
                    onChange={this.inputTitle}
                    id="standard-basic"
                    label="Title"
                    margin="normal"
                />
                <TextField
                    onChange={this.inputDescription}
                    label="Description"
                    multiline
                    rows="8"
                    fullWidth
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    placeholder="Describe this movie"
                />
                    </CardActions>
                  </Card>
                ))}
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </Grid>
                
            

        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(withRouter(Edit));