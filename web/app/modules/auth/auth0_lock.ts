import Auth0Lock from "auth0-lock";

export const lock = new Auth0Lock(
   "x2pKjxcL9XLMqWO1k5H6Tr3eFcU06Ggr",
   "hackspeed-dev.auth0.com",
   {
      auth: {
         redirect: true,
         redirectUrl: "/auth_callback" 
      }
   }
);

// Listen for authenticated event; pass the result to a function as authResult
lock.on("authenticated", function(authResult) {
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
