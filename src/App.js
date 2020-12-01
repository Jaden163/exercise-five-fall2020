import React, { useEffect, useState } from "react";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  // initialize app when ready
  useEffect(() => {
    // only initialize when not exists
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      // check if user login
      if (user) {
        setLoggedIn(true);
        setUserInfo(user);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  // login func
  function LoginFunction(e) {
    // stop form from submitting as normal
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("LOGIN RESPONSE", response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("LOGIN ERROR", error);
      });
  }

  // logout func
  function LogoutFunction(e) {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false);
        setUserInfo({});
      })
      .catch(function (error) {
        console.log("LOGOUT ERROR", error);
      });
  }

  // acc creation
  function CreateAccountFunction(e) {
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("VALID ACCOUNT CREATED FOR", email, response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("ACCOUNT CREATION ERROR", error);
      });
  }

  // could load loading component
  // if still loading, return nothing
  if (loading) return null;

  return (
    <div className="App">
      <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction} />
      <Router>
        <Route exact path="/login">
          {/* Not logged in */}
          {!loggedIn ? (
            <Login LoginFunction={LoginFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/create-account">
          {!loggedIn ? (
            <CreateAccount CreateAccountFunction={CreateAccountFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/">
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <UserProfile userInfo={userInfo} />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
