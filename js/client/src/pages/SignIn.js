import React from 'react';
import {Link} from "react-router-dom";
import {HOME_ROUTE, SIGN_UP_ROUTE} from "../utils/consts";
import apiAxios from "../utils/api-axios";
import {setUser} from "../utils/users";
import {toast} from "react-toastify";
import {GoogleLogin} from "@react-oauth/google";

function SignIn(props) {
  return (
    <div className="feedback-list">
      <form onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
          const {data} = await apiAxios.post('/api/users/login', formData);
          setUser(data.token);
          window.location.href = HOME_ROUTE;
        } catch (err) {
          toast.error(err?.response?.data?.message);
        }

      }}>
        <p>
          <label htmlFor="id_email">Email: </label>
          <input type="email" name="email" autoFocus="" maxLength="150" required id="id_email"/>
        </p>
        <p>
          <label htmlFor="id_password">Password:</label>
          <input type="password" name="password" required id="id_password"/>
        </p>
        <p>Don't have an account? Create one <Link to={SIGN_UP_ROUTE}>here</Link></p>
        <button type="submit">
          Login
        </button>
      </form>
      <GoogleLogin
        onSuccess={async credentialResponse => {
          try {
            const {data} = await apiAxios.post('api/users/google', {token: credentialResponse.credential});
            setUser(data.token);
            window.location.href = HOME_ROUTE;
          } catch (err) {
            toast.error('Google login failed');
          }
        }}
        onError={() => {
          toast.error('Google login failed');
        }}
      />
    </div>

  );
}

export default SignIn;