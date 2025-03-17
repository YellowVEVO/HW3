import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'; // Import useParams

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // Get movieId from URL parameters
  const selectedMovie = useSelector(state => state.movie.selectedMovie) || {};
  const loading = useSelector(state => state.movie.loading); // Assuming you have a loading state in your reducer
  const error = useSelector(state => state.movie.error); // Assuming you have an error state in your reducer


  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const DetailInfo = () => {
    if (loading) {
      return <div>Loading....</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!selectedMovie || Object.keys(selectedMovie).length === 0) {
      return <div>No movie data available.</div>;
    }
    console.log(selectedMovie);
    return (
      <Card className="bg-dark text-dark p-4 rounded">
        <Card.Header>Movie Detail</Card.Header>
        <Card.Body>
          <Image className="image" src={selectedMovie.imageUrl || "https://via.placeholder.com/200"} thumbnail />
        </Card.Body>
        <ListGroup>
          <ListGroupItem>{selectedMovie.title}</ListGroupItem>
          <ListGroupItem>
            {selectedMovie.actors && selectedMovie.actors.length > 0 ? (
              selectedMovie.actors.map((actor, i) => (
                <p key={i}>
                  <b>{actor.actorName}</b> {actor.characterName}
                </p>
              ))
            ) : (
              <p>No actors available</p>
            )}
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              <BsStarFill /> {selectedMovie.avgRating || "N/A"}
            </h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
            selectedMovie.reviews.map((review, i) => (
              <p key={i}>
                <b>{review.username}</b>&nbsp; {review.review} &nbsp; <BsStarFill /> {review.rating}
              </p>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </Card.Body>
      </Card>
    );
  };

  return <DetailInfo />;
};


export default MovieDetail;