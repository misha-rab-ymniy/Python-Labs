import React from 'react';
import apiAxios from "../utils/api-axios";
import {Navigate, useNavigate} from "react-router-dom";
import {FEEDBACKS_ROUTE, SIGN_IN_ROUTE} from "../utils/consts";
import {getUser} from "../utils/users";

function NewFeedback() {
  const navigate = useNavigate();

  const user = getUser();
  if (!user) {
    return <Navigate to={SIGN_IN_ROUTE}/>;
  }
  return (
    <section itemScope itemType="https://schema.org/Review">
      <h2>Create New Feedback</h2>
      <form method="post" itemProp="reviewBody" onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await apiAxios.post('/api/feedbacks', formData);
        navigate(FEEDBACKS_ROUTE);
      }}>
        <p>
          <label htmlFor="id_title">Title:</label>
          <input type="text" name="title" maxLength="255" required="required" id="id_title" itemProp="name"/>
        </p>
        <p>
          <label htmlFor="id_rating">Rating:</label>
          <input type="number" name="rating" min="1" max="5" required="required" id="id_rating"
                 itemProp="reviewRating"/>
        </p>
        <p>
          <label htmlFor="id_content">Content:</label>
          <textarea name="content" id="id_content"></textarea>
        </p>
        <button type="submit">Save</button>
      </form>
    </section>
  );
}

export default NewFeedback;