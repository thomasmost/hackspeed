import * as React from "react";
import { lock } from "../auth/auth0_lock";


export class LoginPage extends React.Component {

   componentDidMount() {
      lock.show();
   }

   render () {
      return <div>
      </div>;
   }
}
