import * as express from "express";
import Project from "../models/project.model";
import User from "../models/user.model";
import Skill from "../models/skill.model";
import Event from "../models/event.model";
import * as skillHelper from "../helpers/skill.helper";
import * as userHelper from "../helpers/user.helper";
import * as Promise from "bluebird";
import Match from "../../shared/interfaces/match.model";

let router = express.Router();
//Router is namespaced in server.js to /api/sessions
export default function () {

   router.get("/self", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      res.send(req.user);
   });

   router.get("/list", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      User.findAll()
      .then( (users) =>
      {
         res.send(users);
      });
   });

   router.post("/ensure", function (req: any, res: express.Response, next: express.NextFunction) {
      if (!req.token || !req.body.email) {
         throw new Error("Expected a token and email address");
      }
      return User.find({
         where: {
            email: req.body.email
         }
      })
      .then((user) => {
         if (!user) {
            return User.create({
               email: req.body.email,
               auth_zero_access_token: req.token
            });
         }
         return user.update({
            auth_zero_access_token: req.token
         });
      })
      .then(() => {
         res.status(204).end();
      });
   });

   // careful before trying to use this... not to be confused with /ensure above
   router.post("/add", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      const {name} = req.body;
      const user = {
         name: name
      } as User;
      User.create(user)
      .then((User) => {
         res.send(User);
      });
   });


   router.post("/skill", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      const {skill} = req.body;
      Skill.create(skill)
      .then((skill) => {
         res.send(skill);
      });
   });

   router.delete("/skill", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      const skill_id = req.params.skill_id as number;
      Skill.findById(skill_id)
      .then((skill) => skill.destroy())
      .then(() => res.status(204).end());
   });

   router.get("/suggested_projects", function(req: express.Request, res: express.Response, next: express.NextFunction){
      const event_id = req.params.event_id;
      const user: User = req.user;
      const eventPromise = Event.findById(event_id)
      const userRemainingHoursPromise = eventPromise.then((event) => userHelper.workingHoursForEvent(user, event));

      const projectsPromise = Project.findAll({
         where: {event_id}
      });

      Promise.props({
         projects: projectsPromise,
         userRemainingHours: userRemainingHoursPromise
      }).then(({projects, userRemainingHours})=>{
         const matches = projects.map((project) => {
            let match = project.remaining_effort.reduce((match, projectSkill) => {
               const userHasApplicableSkill = user.skills.some((userSkill) => skillHelper.skillIsApplicable(userSkill, projectSkill));
               if (userHasApplicableSkill){
                  match += projectSkill.man_hours;
               }
               return match;
            }, 0);
            if (match > userRemainingHours){
               match = userRemainingHours;
            }
            return new Match(match, project.views, project);
         });

         return matches.sort((a, b) => b.match - a.match && b.popularity - a.popularity);
      });
   });

   return router;

}