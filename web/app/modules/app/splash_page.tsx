import * as React from "react";
import { container } from "./splash.scss";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

export class SplashPage extends React.Component {

   render () {
      return (
         <div className={container}>
            <ReactSVG path="hackspeed.svg" />
            <div>
               HackSpeed is a team-building and project management site for Hackathons.
            </div>
            <div>
               It was built at a Hackathon, so there's no questioning our domain knowledge here.
            </div>
            <Link to="/i/profile" >
               <button>
                  Start Hacking
               </button>
            </Link>
         </div>
      );
   }
}
