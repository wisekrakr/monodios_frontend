import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

//CSS
import "./App.css";
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

//Store
import store from "./store";
import { loadUser } from "./actions/authentication";

//Routes
import Routes from "./routes/Routes";

import setAuthToken from "./utils/setAuthToken";

//Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";

//Components
import NavBar from "./components/layouts/NavBar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/home" component={Home} />

              <Route component={Routes} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
