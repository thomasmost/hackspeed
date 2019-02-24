// auth-middleware.ts
// TCMoore

import User from "../models/user.model";
import express = require("express");

export const isAuthenticated = function (req: any, res: express.Response, next: express.NextFunction) {
   if (!req.token) {
      throw new Error("Expected a token and email address");
   }
   return User.find({
      where: {
         auth_zero_access_token: req.token
      }
   })
   .then((user) => {
      if (user) {
         req.user = user;
         next();
         return;
      }
      res.status(401).end();
   });
};

export const tryDecryptUser = function (req: express.Request, res: express.Response, next: express.NextFunction) {
   // passport.authenticate("jwt", {session: false}, function(err: any, user: IUser, info: any) {
   //   if (err) { return next(err); }
   //   if (user) {
   //      req.user = user;
   //   }
   //   next();
   // })(req, res, next);
};
