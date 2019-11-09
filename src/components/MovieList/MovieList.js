import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from './MovieItem/MovieItem';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class MovieList extends Component {

  // Renders the entire app on the DOM
  render() {
    return (
        // <>
        // <p>hello world</p>
        // <ul>
        //     {this.props.reduxState.movies.map ((movie) => 
        //         <li>{movie.title}</li>
        //         )}
        // </ul>
        // </>
        <Grid
                container
                wrap='wrap'
                alignContent='space-around'
                justify='center'
            >
                {this.props.reduxState.movies.map((movie) => (
                    <Card style={{maxWidth: 400}}>
                    <CardActionArea>
                      <CardMedia
                        style={{height: 400}}
                        image= {movie.poster}
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
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                    // <Card
                    // key={movie.id}
                    // item
                    // sm={3}
                    // >
                    //     <h2>{movie.title}</h2>
                        
                    // </Card>
                ))}
            </Grid>
    )
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(MovieList);