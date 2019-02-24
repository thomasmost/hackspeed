import * as express from "express";
import Project from "../models/project.model";
import EventUser from "server/models/event_user.model";
import User from "server/models/user.model";
import Event from "../models/event.model";
import * as userHelper from "../helpers/user.helper";
import * as skillHelper from "../helpers/skill.helper";
import * as Promise from "bluebird";
import Match from "../../shared/interfaces/match.model";

let router = express.Router();
//Router is namespaced in server.js to /api/sessions
export default function () {

   router.get("/list", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      Project.findAll()
      .then( (projects) =>
      {
         res.send(projects);
      });
   });

   router.post("/add", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      let {name} = req.body;
      let project = {
         name: name
      } as Project;
      Project.create(project)
      .then((project) => {
         res.send(project);
      });
   });

   router.delete("/", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      Project.findAll()
      .then( (projects) =>
      {
         return Promise.all(
            projects.map((project) => project.destroy())
         );
      })
      .then(() => {
         res.status(204).end();
      });
   });

   router.put("/update-name", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      let project = req.body.payload as Project;

      return Project.update({
         name: project.name
      }, {
         where: {
            id: project.id
         }
      })
      .then(function () {
         return Project.findAll();
      })
      .then( (projects) =>
      {
         res.send(projects);
      });
   });

   router.delete("/single", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      let id = req.body.payload;

      return Project.destroy({
         where: {
            id
         }
      })
      .then(function () {
         return Project.findAll();
      })
      .then((projects) =>
      {
         res.send(projects);
      });
   });

   router.get("/suggested_users", function(req: express.Request, res: express.Response, next: express.NextFunction){
      const event_id = req.params.event_id;
      const project_id = req.params.project_id;
      const eventPromise = Event.findById(event_id);

      const eventUsersPromise = EventUser.findAll({
         where: {event_id}
      });

      const usersPromise = eventUsersPromise.then((eventUsers) => {
         const userIdSet = new Set<number>();
         eventUsers.forEach((eventUser) => userIdSet.add(eventUser.user_id));
         const userIds = [...userIdSet];
         return User.findAll({
            where: {
               id: userIds
            }
         });
      });

      const projectPromise = Project.findById(project_id);

      Promise.props({
         event: eventPromise,
         users: usersPromise,
         project: projectPromise
      }).then(({event, users, project})=>{
         return Promise.map(users, (user) => {
            return userHelper.uncommitedHoursForEvent(user, event).then((userUncommitedHours) => {
               let match = project.remaining_effort.reduce((match, projectSkill) => {
                  const userHasApplicableSkill = user.skills.some((userSkill) => skillHelper.skillIsApplicable(userSkill, projectSkill));
                  if (userHasApplicableSkill){
                     match += projectSkill.man_hours;
                  }
                  return match;
               }, 0);
               if (match > userUncommitedHours){
                  match = userUncommitedHours;
               }
               return new Match(match, 0, project);
            });
         });
      }).then((matches) => {
         return matches.sort((a, b) => b.match - a.match && b.popularity - a.popularity);
      });
   });

   return router;

}