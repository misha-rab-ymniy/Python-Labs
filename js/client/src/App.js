import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="718631301816-rdre3a1tnherad3qjip2208tsbripm51.apps.googleusercontent.com">
      <BrowserRouter>
        <NavBar/>
        <AppRouter/>
        <ToastContainer position={'top-right'} theme="colored"/>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
