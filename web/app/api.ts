import { clientSession } from "./modules/auth/auth.session";

export const api = {
   send: (input: RequestInfo, init?: RequestInit) => {
      if (init) {
         if (!init.headers) {
            init.headers = {};
         }
         init.headers["Authorization"] = "Bearer " + clientSession.accessToken;
      }
      return fetch(input, init);
   }
}