import Auth0Lock from "auth0-lock";

import { history } from "../../web";

console.log(process.env)
console.log(`${process.env.RETURN_HOST}auth_callback`)

export const lock = new Auth0Lock(
   "x2pKjxcL9XLMqWO1k5H6Tr3eFcU06Ggr",
   "hackspeed-dev.auth0.com",
   {
      auth: {
         // params: {
         //    scope: "openid email picture"
         // },
         redirect: true,
         redirectUrl: `${process.env.RETURN_HOST}auth_callback`,
         responseType: "token id_token"
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