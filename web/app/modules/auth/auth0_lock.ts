import Auth0Lock from "auth0-lock";

import { history } from "../../web";

export const lock = new Auth0Lock(
   "x2pKjxcL9XLMqWO1k5H6Tr3eFcU06Ggr",
   "hackspeed-dev.auth0.com",
   {
      auth: {
         redirect: true,
         redirectUrl: "http://localhost:3000/auth_callback",
         responseType: "token id_token",
      }
   }
);


lock.on("authenticated", function(authResult) {

   history.replace("/auth_callback");
   // Call getUserInfo using the token from authResult
   lock.getUserInfo(authResult.accessToken, function(error, profile) {
     if (error) {
       // Handle error
       return;
     }
     // Store the token from authResult for later use
     localStorage.setItem("accessToken", authResult.accessToken);
   });
   });