import React from 'react';
import {getImagePath} from "../utils/getImagePath";
import {NEW_ARTICLE, NEWS_ROUTE} from "../utils/consts";
import {Link} from "react-router-dom";
import {useApiGet} from "../hooks/useApi";
import {getUser} from "../utils/users";

function Article({article}) {
  return <div className="article_wrap">
    <article className="article">
      <figure itemProp="image" itemScope itemType="https://schema.org/ImageObject" className="article_img">
        <img alt="article poster" src={getImagePath(article.img)} itemProp="contentUrl"/>
      </figure>
      <h3>{article.title}</h3>
      <p className="article_description">{article.description}</p><br/>
      <Link to={`${NEWS_ROUTE}/${article.id}`}>Read more</Link>
    </article>
  </div>;
}

function ArticleList() {
  const {data, error, loading} = useApiGet('api/articles');

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return error.toString();
  }

  if (!data?.length) {
    return <p>No articles</p>;
  }


  return data.map((article) => <Article article={article}/>);
}

function News(props) {
  const user = getUser();

  return (
    <>
      {user?.role === 'ADMIN' && <Link to={NEW_ARTICLE} id="new_article_button">New article</Link>}
      <div id="news">
        <ArticleList/>
      </div>
    </>

  );
}

export default News;