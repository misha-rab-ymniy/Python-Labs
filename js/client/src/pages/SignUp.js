import React from 'react';
import apiAxios from "../utils/api-axios";
import {setUser} from "../utils/users";
import {HOME_ROUTE, SIGN_IN_ROUTE} from "../utils/consts";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Joi from "joi";
import {joiValidate} from "../utils/joiValidate";

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string().min(8),
  confirmPassword: Joi.string().min(8),
});

function SignUp(props) {
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');

      if (password !== confirmPassword) {
        toast.error('Passwords doesnt match');
        return;
      }

      const isValid = joiValidate(schema, formData);
      if (!isValid) {
        return;
      }

      const {data} = await apiAxios.post('/api/users/registration', formData);
      setUser(data.token);
      window.location.href = HOME_ROUTE;
    }}>
      <p>
        <label htmlFor="id_username">Username:</label>
        <input type="text" name="name" maxLength="150" id="id_username"/>
      </p>
      <p>
        <label htmlFor="id_email">Email:</label>
        <input type="email" name="email" maxLength="320" id="id_email"/>
      </p>
      <p>
        <label htmlFor="id_password">Password:</label>
        <input type="password" name="password" id="id_password"/>
      </p>
      <p>
        <label htmlFor="id_confirmPassword">Confirm password:</label>
        <input type="password" name="confirmPassword" id="id_confirmPassword"/>
      </p>
      <p>Have an account? Login <Link to={SIGN_IN_ROUTE}>here</Link></p>
      <button type="submit">Register</button>
    </form>
  );
}

export default SignUp;