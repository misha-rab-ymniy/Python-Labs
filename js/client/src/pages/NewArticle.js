import React from 'react';
import apiAxios from "../utils/api-axios";
import {Navigate, useNavigate} from "react-router-dom";
import {NEWS_ROUTE} from "../utils/consts";
import {getUser} from "../utils/users";

function NewFeedback() {
  const navigate = useNavigate();

  const user = getUser();
  if (user?.role !== 'ADMIN') {
    return <Navigate to="/"/>;
  }

  return (
    <section>
      <h2>Create New Article</h2>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await apiAxios.post('/api/articles', formData);
        navigate(NEWS_ROUTE);
      }}>
        <p>
          <label htmlFor="id_title">Title:</label>
          <input type="text" name="title" maxLength="255" required="required" id="id_title"/>
        </p>
        <p>
          <label htmlFor="id_description">Description:</label>
          <input type="text" name="description" maxLength="255" required="required" id="id_description"/>
        </p>
        <p>
          <label htmlFor="id_content">Content:</label>
          <textarea name="content" id="id_content"></textarea>
        </p>
        <p>
          <label htmlFor="id_img">Image: </label>
          <input type="file" name="img" id="id_img" required/>
        </p>
        <button type="submit">Save</button>
      </form>
    </section>
  );
}

export default NewFeedback;