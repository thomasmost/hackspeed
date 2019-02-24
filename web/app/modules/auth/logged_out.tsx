import * as React from "react";
import { clientSession } from "./auth.session";


export class LoggedOutPage extends React.Component {

   componentDidMount() {
      clientSession.logout();
   }

   render () {
      return (
         <div>
            May the Hacks be Ever in your Favor.
         </div>
      );
   }
}
