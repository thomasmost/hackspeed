
import { WebAuth, Auth0DecodedHash } from "auth0-js";

import { history } from "../../web";
import { api } from "web/app/api";

export default class Auth {
      auth0 = new WebAuth({
      domain: "hackspeed-dev.auth0.com",
      clientID: "x2pKjxcL9XLMqWO1k5H6Tr3eFcU06Ggr",
      redirectUri: "http://localhost:3000/auth_callback",
      responseType: "token id_token",
      scope: "openid"
      });
   accessToken: string;
   idToken: string;
   expiresAt: number;

   constructor() {
      //  this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
      this.getIdToken = this.getIdToken.bind(this);
      this.renewSession = this.renewSession.bind(this);
   }

   handleAuthentication() {
      this.auth0.parseHash((err, authResult) => {
         if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
         } else if (err) {
         history.replace("/");
         console.log(err);
         alert(`Error: ${err.error}. Check the console for further details.`);
         }
      });
   }

   getAccessToken() {
      return this.accessToken;
   }

   getIdToken() {
      return this.idToken;
   }

   setSession(authResult: Auth0DecodedHash) {
      // Set isLoggedIn flag in localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Set the time that the access token will expire at
      let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
      this.accessToken = authResult.accessToken;
      this.idToken = authResult.idToken;
      this.expiresAt = expiresAt;

      // navigate to the home route
      history.replace("/i");
      api.send("/api/users/ensure", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           email: authResult.idTokenPayload.email
        })
      });
   }

   renewSession() {
      this.auth0.checkSession({}, (err, authResult) => {
         if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
         } else if (err) {
            this.logout();
            console.log(err);
            alert(`Could not get a new token (${err.error}: ${err.errorDescription}).`);
         }
      });
   }

   logout() {
      // Remove tokens and expiry time
      this.accessToken = null;
      this.idToken = null;
      this.expiresAt = 0;

      // Remove isLoggedIn flag from localStorage
      localStorage.removeItem("isLoggedIn");

      // // navigate to the home route
      // history.replace("/logout");
   }

   isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = this.expiresAt;
      return new Date().getTime() < expiresAt;
   }
}