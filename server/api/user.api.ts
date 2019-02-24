import * as express from "express";
import Project from "../models/project.model";
import User from "server/models/user.model";
import Skill from "server/models/skill.model";

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

   // router.get("/suggested_projects", function(req: express.Request, res: express.Response, next: express.NextFunction){
   //    const event_id = req.params.event_id;
   //    const user = req.user;

   //    Project.findAll({
   //       where: {event_id}
   //    }).then((projects)=>{
   //       return projects.map((project) => {
   //          const match = project.remaining_effort.reduce((match, skill) => {
   //             user.skills.if(skill)
   //          }, 0);
   //          projects.match = match;
   //       })
   //    })

   // });

   return router;

}