import * as React from "react";

import { container } from "./auth_callback.scss";
import ReactSVG from "react-svg";

export const AuthCallback = () => {
   return (
      <div className={container}>
         <ReactSVG path="loading.svg" />
         <div>
            Authenticating
         </div>
      </div>
   );
}
