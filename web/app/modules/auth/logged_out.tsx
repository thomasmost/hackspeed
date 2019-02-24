import * as React from "react";
import { lock } from "../auth/auth0_lock";


export class LoggedOutPage extends React.Component {

   componentDidMount() {
      localStorage.setItem("accessToken", "");
   }

   render () {
      return (
         <div>
            May the Hacks be Ever in your Favor.
         </div>
      );
   }
}
