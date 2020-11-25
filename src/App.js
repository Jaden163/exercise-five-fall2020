import React from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "./App.css";

import Login from "./containers/Login";
import CreateAccount from "./containers/CreateAccount";
import UserProfile from "./containers/UserProfile";

import Header from "./components/Header";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "exercise-five-fall2020-4f655.firebaseapp.com",
  databaseURL: "https://exercise-five-fall2020-4f655.firebaseio.com",
  projectId: "exercise-five-fall2020-4f655",
  storageBucket: "exercise-five-fall2020-4f655.appspot.com",
  messagingSenderId: "717337376235",
  appId: "1:717337376235:web:8afdf6f27c2a402887d5ae",
};

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <UserProfile />
        </Route>
      </Router>
    </div>
  );
}

export default App;
