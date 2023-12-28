import React from 'react';
import {Link} from "react-router-dom";
import {NEW_FEEDBACK_ROUTE} from "../utils/consts";
import {useApiGet} from "../hooks/useApi";
import Loading from "../components/Loading";

function Feedback({feedback}) {
  return <article itemProp="itemListElement" itemScope itemType="https://schema.org/Review" className="feedback">
    <h2 itemProp="name">{feedback.title}</h2>
    <h2 itemProp="reviewRating">Rate: {feedback.rating}</h2>
    <h3>
      Author: <span itemProp="author">{feedback.user.name}</span> -
      <time itemProp="datePublished">{new Date(feedback.createdAt).toDateString()}</time>
    </h3>
    <p itemProp="reviewBody">{feedback.content}</p>
  </article>;
}

function FeebackList() {
  const {data, error, loading} = useApiGet('/api/feedbacks');

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return error.toString();
  }

  if (!data?.length) {
    return <p>No feedbacks</p>;
  }

  return data.map((feedback) => <Feedback feedback={feedback}/>);
}

function Feedbacks() {
  return (
    <div className="feedback-list">
      <h2>Feedbacks</h2>
      <Link to={NEW_FEEDBACK_ROUTE} className="feedback-button">New feedback</Link>
      <section itemScope itemType="https://schema.org/ItemList">
        <FeebackList/>
      </section>
    </div>
  );
}

export default Feedbacks;
