import {useApiGet} from "../hooks/useApi";
import {useNavigate, useParams} from "react-router-dom";
import {getImagePath} from "../utils/getImagePath";
import {NEW_MOVIE} from "../utils/consts";
import {getUser} from "../utils/users";
import apiAxios from "../utils/api-axios";
import Loading from "../components/Loading";

export function MovieDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {data: movie, error, loading} = useApiGet(`/api/movies/${id}`);
  const user = getUser();

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return error.toString();
  }

  return <>
    <section id="movie_details">
      <img src={getImagePath(movie.poster)} alt="poster" height="600"/>
      <div id="movie_details_info">
        <h1>{movie.title}</h1>
        <p>Year: {movie.yearOfProduction}</p>
        <p>Duration: {movie.duration}</p>
        <p>Country: {movie.country}</p>
        <p>IMDb score: {movie.rating} </p>
        <p>{movie.description}</p>
      </div>
      <div className="buttons">
        {user?.role === 'ADMIN' && <>
          <button onClick={() => navigate(NEW_MOVIE, {state: movie})}>Update</button>
          <button onClick={async () => {
            await apiAxios.delete(`/api/movies/${movie.id}`);
            navigate(NEW_MOVIE, {state: movie});
          }
          }>Delete
          </button>
        </>}
      </div>
    </section>
  </>;
}