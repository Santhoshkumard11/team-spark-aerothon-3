import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// api components
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// core components
import Admin from "layouts/Admin.js";
import Login from 'views/Login/Login'; 
import LeaderBoard from 'views/LeaderBoard/LeaderBoardView.jsx';
import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();
require("dotenv").config();

const httpLink = createHttpLink({
  uri: "https://team-spark.herokuapp.com/api/g/",
  //uri: "http://127.0.0.1:8000/api/g/",
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
        ? `JWT ${token}`
        : "",
    },
  };
});

const client = new ApolloClient({
  link : authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        <Route exact path="/admin/login" component={Login} />
        <Route exact path="/leaderboard-app" component={LeaderBoard} />
        <Route path="/admin" component={Admin} />
        <Redirect exact from="/" to="/admin/login" />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);