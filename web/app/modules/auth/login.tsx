import * as React from "react";
import { lock } from "../auth/auth0_lock";
import { clientSession } from "./auth.session";

export class LoginPage extends React.Component {

   componentDidMount() {
      // if (localStorage.getItem("isLoggedIn") === "true") {
      //   clientSession.renewSession();
      // }
      // else {
         lock.show();
      // }
   }

   render () {
      return <div>
      </div>;
   }
}
