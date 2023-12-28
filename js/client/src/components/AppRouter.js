import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from "../pages/Home";
import {
  ADDITIONAL_ROUTE, NEW_FEEDBACK_ROUTE,
  FEEDBACKS_ROUTE,
  HOME_ROUTE,
  MOVIES_ROUTE,
  NEWS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE, NEW_ARTICLE, NEW_MOVIE,
} from "../utils/consts";
import News from "../pages/News";
import Movies from "../pages/Movies";
import Feedbacks from "../pages/Feedbacks";
import Additional from "../pages/Additional";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NewFeedback from "../pages/NewFeedback";
import NewArticle from "../pages/NewArticle";
import NewMovie from "../pages/NewMovie";
import {MovieDetails} from "../pages/MovieDetails";
import {ArticleDetails} from "../pages/ArticleDetails";

const NotFound = () => {
  return <>Not found!</>;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path={HOME_ROUTE} Component={Home}/>
      <Route path={NEWS_ROUTE} Component={News}/>
      <Route path={NEW_ARTICLE} Component={NewArticle}/>
      <Route path={`${NEWS_ROUTE}/:id`} Component={ArticleDetails}/>
      <Route path={MOVIES_ROUTE} Component={Movies}/>
      <Route path={`${MOVIES_ROUTE}/:id`} Component={MovieDetails}/>
      <Route path={NEW_MOVIE} Component={NewMovie}/>
      <Route path={FEEDBACKS_ROUTE} Component={Feedbacks}/>
      <Route path={NEW_FEEDBACK_ROUTE} Component={NewFeedback}/>
      <Route path={ADDITIONAL_ROUTE} Component={Additional}/>
      <Route path={SIGN_IN_ROUTE} Component={SignIn}/>
      <Route path={SIGN_UP_ROUTE} Component={SignUp}/>
      <Route path={'*'} Component={NotFound}></Route>
    </Routes>
  );
};


export default AppRouter;
