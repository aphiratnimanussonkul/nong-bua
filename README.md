### Create new React Project

> \$ npx create-react-app "Project Name"

### Add Redux to your project

> \$ yarn add redux react-redux

### Add css framework (Material UI)

> $ npm install @material-ui/core <br />
>$ npm install @material-ui/icons

### Add SCSS

> \$ yarn add node-sass

### Add Route

#### 1. Create route file (./router/index.js)

install react-router-dom

> \$ npm install --save react-router-dom <br/>

code

```javascript
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../components/home/home.js";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Routing;
```

#### 2. Create file reducers (./reducers/index.js)

install redux-form and connected-react-router

> \$ npm install --save <br/> \$ npm install --save connected-react-router
> code

```javascript
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from "redux-form";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    form,
  });
```

#### 3. Create file store (./stores/index.js)

install redux-thunk

> \$ npm install --save redux-thunk
> code

```javascript
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";

import rootReducers from "../reducers";

export const history = createBrowserHistory();
const historyRouterMiddleware = routerMiddleware(history);

const store = createStore(
  rootReducers(history),
  applyMiddleware(thunk, historyRouterMiddleware)
);

export default store;
```

#### 4. Use Provider store and ConnectRouter history on index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import store, { history } from "./stores";
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
```

#### 5. Add Routes on App.js

code

```javascript
import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Routes from "./routes/index";
import { withRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header></Header>
      <Routes></Routes>
      <Footer></Footer>
    </>
  );
};

export default withRouter(App);
```

### Install caroural

> \$ npm install react-material-ui-carousel --save

### Run Project

> \$ npm start

### Deploy on Firebase hosting

#### 1. Build your react project

> \$ npm run build

you will see folder build

#### 2. Create Firebase project

#### 3. Add this code inside <body> tag on index.html

```html
<script src="/__/firebase/7.17.1/firebase-app.js"></script>
<script src="/__/firebase/init.js"></script>
```

#### 4. Install firebase tool

> \$ npm install -g firebase-tools

#### 5. Login Firebase

> \$ firebase login

#### 6. Init firebase service

> \$ firebase init <br/>

- choose service -> Firebase hosting
- select existing project
- What do you want to use your public directory => build
  (from step 1)
- Configure as a single app (rewrite all urls to /index.html)? No
- File build/index.html already exists. Overwrite? No

#### 7. Deploy

> \$ firebase deploy --hosting
