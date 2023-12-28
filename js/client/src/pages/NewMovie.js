import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getUser} from "../utils/users";
import apiAxios from "../utils/api-axios";
import {MOVIES_ROUTE} from "../utils/consts";

function NewMovie(props) {
  const navigate = useNavigate();
  const {state: movie} = useLocation();

  console.log(movie);
  const user = getUser();
  if (user?.role !== 'ADMIN') {
    return navigate('/');
  }

  return (
    <section>
      <h2>Create New Movie</h2>

      <form onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (movie) {
          await apiAxios.patch(`/api/movies/${movie.id}`, formData);
        } else {
          await apiAxios.post('/api/movies', formData);
        }

        navigate(MOVIES_ROUTE);
      }}>
        <p>
          <label htmlFor="id_title">Title:</label>
          <input defaultValue={movie?.title} type="text" name="title" maxLength="255" required="required"
                 id="id_title"/>
        </p>
        <p>
          <label htmlFor="id_description">Description:</label>
          <input defaultValue={movie?.description} type="text" name="description" maxLength="255" required="required"
                 id="id_description"/>
        </p>
        <p>
          <label htmlFor="id_duration">Duration:</label>
          <input defaultValue={movie?.duration} type="text" name="duration" maxLength="255" required="required"
                 id="id_duration"/>
        </p>
        <p>
          <label htmlFor="id_country">Country:</label>
          <input defaultValue={movie?.country} type="text" name="country" maxLength="255" required="required"
                 id="id_country"/>
        </p>
        <p>
          <label htmlFor="id_rating">Rating:</label>
          <input defaultValue={movie?.rating} type="number" name="rating" min="0" max="10" required="required"
                 id="id_rating"/>
        </p>
        <p>
          <label htmlFor="id_yearOfProduction">Year of production:</label>
          <input defaultValue={movie?.yearOfProduction} type="text" name="yearOfProduction" maxLength="255"
                 required="required" id="id_yearOfProduction"/>
        </p>
        <p>
          <label htmlFor="id_img">Poster: </label>
          <input type="file" name="img" id="id_img" required={!movie}/>
        </p>
        <button type="submit">Save</button>
      </form>
    </section>
  );
}

export default NewMovie;