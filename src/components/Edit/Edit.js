import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core';
import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom';


class Edit extends Component {

    state = {
            id: this.props.reduxState.movies.id,
            title: '',
            description: '',
    }

    inputDescription = (event) => {
        this.setState({
            ...this.state,
            description: event.target.value
        });
    }

    

    inputTitle = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }

    changeTitleAndDescription (state) {
        console.log('in changeTitleAndDescription', state);
        this.props.dispatch({type: 'EDIT_MOVIE', payload: state})
        this.props.history.push('/details')
        
    }


    goBackToDetails() {
        console.log('in goBackToDetails');
        this.props.history.push('/details')
    }

    // Renders the entire app on the DOM
    render() {
        return (

                <>
                <Button onClick={()=>(this.goBackToDetails())} size="small" color="primary">
                    Cancel
                      </Button>
                <Button onClick={()=>(this.changeTitleAndDescription(this.state))} size="small" color="primary">
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
                <pre>{JSON.stringify( this.state, null, 2)}</pre>
                </>
            
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(withRouter(Edit));