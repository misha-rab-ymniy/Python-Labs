import {useApiGet} from "../hooks/useApi";
import {useNavigate, useParams} from "react-router-dom";
import {getImagePath} from "../utils/getImagePath";
import {NEW_ARTICLE} from "../utils/consts";
import {getUser} from "../utils/users";
import apiAxios from "../utils/api-axios";
import Loading from "../components/Loading";

export function ArticleDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {data: article, error, loading} = useApiGet(`/api/articles/${id}`);
  const user = getUser();

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return error.toString();
  }

  return <>
    <div className="article_details">
      <img src={getImagePath(article.img)} alt="poster" height="600"/>
      <h2 id="article_name">{article.title}</h2>
      <h3 id="article_description">{article.description}</h3>

      <p id="article_text">{article.content}</p>
      <div className="dates">
        <p>{new Date(article.createdAt).toLocaleString()}</p>
        <p>{new Date(article.updatedAt).toLocaleString()}</p>
        <p>{new Date(article.createdAt).toString()}</p>
        <p>{new Date(article.updatedAt).toString()}</p>
      </div>
      <div className="buttons_wrapper">
        {user?.role === 'ADMIN' && <>
          <button onClick={() => navigate(NEW_ARTICLE, {state: article})}>Update</button>
          <button onClick={async () => {
            await apiAxios.delete(`/api/articles/${article.id}`);
            navigate(NEW_ARTICLE, {state: article});
          }
          }>Delete
          </button>
        </>}
      </div>
    </div>
  </>;
}