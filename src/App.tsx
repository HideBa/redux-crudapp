import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import "./index.css";
import EventsIndex from "./components/events_index";
import EventsNew from "./components/events_new";
import EventsShow from "./components/events_show";
// import registerServiceWorker from "./registerServiceWorker";
// import { State } from "./types";
import { Action } from "redux";
import { Store } from "./reducers";
// type Store = {
//   state: State;
//   action: Action;
// };
const App = (store: any) => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/events/new" component={EventsNew} />
            <Route path="/events/:id" component={EventsShow} />
            <Route exact path="/" component={EventsIndex} />
            <Route exact path="/events" component={EventsIndex} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
