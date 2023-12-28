import React, {useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {MOVIES_ROUTE, NEW_MOVIE} from "../utils/consts";
import {getImagePath} from "../utils/getImagePath";
import {useApiGet} from "../hooks/useApi";
import {useSort} from "../hooks/useSort";
import {getUser} from "../utils/users";

function Movie({movie}) {
  return <article itemProp="about" itemScope itemType="https://schema.org/Article" id="movie">
    <figure itemProp="image" itemScope itemType="https://schema.org/ImageObject" id="poster">
      <img alt="movie poster" src={getImagePath(movie.poster)} itemProp="contentUrl"/>
    </figure>
    <h3 itemProp="name"><a href={`${MOVIES_ROUTE}/${movie.id}`} itemProp="url">{movie.title}</a></h3>
  </article>;
}

function MovieList() {
  const {sortField, sortDirection, updateSort} = useSort();
  const [search, setSearch] = useState('');

  const params = useMemo(() => ({
    search, sortField, sortDirection,
  }), [search, sortField, sortDirection]);

  const {data, error, loading} = useApiGet('/api/movies', params);

  if (error) {
    return error.toString();
  }

  return <>
    <div id="sort_group">
      <div id="button_group">
        <h3>Sort By:</h3>
        <button onClick={updateSort('title')}>Title</button>
        <button onClick={updateSort('createdAt')}>Created At</button>
      </div>
      <div id="search_group">
        <input name="search" type="text" placeholder="Search..." onChange={(e) => {
          setSearch(e.target.value);
        }}/>
      </div>
    </div>
    <div id="movie_list">
      {loading && <p>Loading...</p>}
      {data?.length ? data.map((movie) => <Movie movie={movie}></Movie>) : <p>No movies found.</p>}
    </div>
  </>;
}

function Movies() {
  const user = getUser();

  return (
    <div className="movies_list_wrapper">
      <section itemScope itemType="https://schema.org/Movie" className="movies_list">
        <h2 itemProp="name">Movies</h2>
        {user?.role === 'ADMIN' && <Link to={NEW_MOVIE}>New movie</Link>}
        <MovieList/>
      </section>
    </div>
  );
}

export default Movies;