import React from "react";
import { Switch, Route } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utils/theme";
import jwtDecode from "jwt-decode";
import AuthRouter from "./utils/auth";
import store from "./redux/store";
import { getUserData, logoutUser } from "./redux/actions/userAction";
import { SET_AUTHENTICATED } from "./redux/types";
import "./App.css";

//Redux stuff
import { connect } from "react-redux";

//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import UserPage from "./pages/user";
import NavBar from "./components/layout/Navbar";
import axios from "axios";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
  "https://us-central1-socialape-f0c10.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App({ loading, screamLoading }) {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      {loading || screamLoading ? (
        <div id="loading">
          <div className="lds-hourglass"></div>
        </div>
      ) : null}
      }
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRouter exact path="/login" component={Login} />
          <AuthRouter exact path="/signup" component={Signup} />
          <Route exact path="/users/:handle" component={UserPage} />
          <Route
            exact
            path="/users/:handle/scream/:screamId"
            component={UserPage}
          />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  screamLoading: state.data.loading,
});

export default connect(mapStateToProps)(App);
