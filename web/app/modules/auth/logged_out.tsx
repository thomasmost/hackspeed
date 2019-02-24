import * as React from "react";
import { clientSession } from "./auth.session";
import { Link } from "react-router-dom";
import { container } from "./logged_out.scss";


export class LoggedOutPage extends React.Component {

   componentDidMount() {
      clientSession.logout();
   }

   render () {
      return (
         <div className={container}>
            <div>
               May the Hacks be Ever in your Favor.
            </div>
            <Link to="/login" >
               <button>
                  Log Back In
               </button>
            </Link>
         </div>
      );
   }
}
