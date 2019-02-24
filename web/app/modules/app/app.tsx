import * as React from "react";
import { Link, Router } from "react-router-dom";
import ReactSVG from "react-svg";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import { InternalApp } from "./internal-app";
import { LoginPage } from "../auth/login";
import { PrivateRoute } from "../auth/private_route";
import { LoggedOutPage } from "../auth/logged_out";
import { SplashPage } from "./splash_page";
import { AuthCallback } from "../auth/auth_callback";
import { clientSession } from "../auth/auth.session";

const handleAuthentication = (nextState: any, replace?: any) => {
   if (/access_token|id_token|error/.test(nextState.location.hash)) {
     clientSession.handleAuthentication();
   }
};

export interface IAppProps { history: any; }
export class App extends React.Component<IAppProps> {
   render() {
      const props = this.props;
        return <ConnectedRouter history={props.history}>
                  <Router history={props.history}>
                     <div className="application-wrapper">
                        <div className="header">
                           <Link to="/i" >
                              <ReactSVG path="hackspeed.svg" />
                           </Link>
                        </div>
                        <Route exact path="/"
                           component={SplashPage} />        
                        <Route exact path="/auth_callback" render={(props) => {
                           handleAuthentication(props);
                           return <AuthCallback />;
                        }}/>
                        <Route exact path="/login"
                           component={LoginPage} />
                        <Route exact path="/logout"
                           component={LoggedOutPage} />
                        <PrivateRoute path="/i"
                           component={InternalApp} />
                     </div>
                  </Router>
               </ConnectedRouter>;
      }
   }