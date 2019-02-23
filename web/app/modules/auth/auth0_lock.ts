import Auth0Lock from "auth0-lock";

export const lock = new Auth0Lock(
   "x2pKjxcL9XLMqWO1k5H6Tr3eFcU06Ggr",
   "hackspeed-dev.auth0.com",
   {
      auth: {
         redirectUrl: "localhost:3000/callback",
         responseType: "code",
         // params: {
         //    scope: "openid email" // Learn about scopes: https://auth0.com/docs/scopes
         // }
      }
   }
);
