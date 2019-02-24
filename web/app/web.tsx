import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";

import { connectRouter, routerMiddleware } from "connected-react-router"

import { createForms } from "react-redux-form";

import { createBrowserHistory } from "history";

import hackspeedReducer from "./reducer";

import createSagaMiddleware from "redux-saga";
// import characterSaga from "./modules/character/character.saga";
// import {sceneSaga, addSceneSaga, updateLayoutSaga, deleteSceneSaga, updateNameSaga} from "./modules/scene/scene.saga";
const sagaMiddleware = createSagaMiddleware()

import { App } from "./modules/app/app";
// import { getCharacterList } from "./modules/character/character.actions";
import { getProjects, getProjectsForUser } from "./modules/project/project.actions";
import { getProjectsSaga, getProjectsForUserSaga, getProjectsForEventSaga } from "./modules/project/project.saga";

// Polyfills
var Promise = require( "promise-polyfill" );

// To add to window
if (!(window as any).Promise) {
 (window as any).Promise = Promise;
}

export const history = createBrowserHistory();
const middleware = routerMiddleware(history)
const store = createStore(
   connectRouter(history)(
      combineReducers({
      ...hackspeedReducer,
      ...createForms({
         addCharacter: {name: ""},
         addProject: {name: ""},
         login: { username: "rebis", password: "" }
      }),
   })),
   applyMiddleware(middleware, sagaMiddleware)
);
// then run the saga
// sagaMiddleware.run(characterSaga);
// sagaMiddleware.run(sceneSaga);
// sagaMiddleware.run(addSceneSaga);
// sagaMiddleware.run(updateLayoutSaga);
// sagaMiddleware.run(deleteSceneSaga);
// sagaMiddleware.run(updateNameSaga);
sagaMiddleware.run(getProjectsSaga);
sagaMiddleware.run(getProjectsForUserSaga);
sagaMiddleware.run(getProjectsForEventSaga);

export abstract class WebApp {
   public static initialize ()
   {
      console.log("rendering app");
      ReactDOM.render(
         <Provider store={store}>
            <App history={history} />
         </Provider>,
         document.getElementById("app")
      );
   }
}
