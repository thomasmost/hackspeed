// auth-middleware.ts
// TCMoore

import * as express from "express";
import Env from "../env";
import { IUser } from "shared/interfaces/user";

export const isAuthenticated = function (req: express.Request, res: express.Response, next: express.NextFunction) {
   return next();
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
