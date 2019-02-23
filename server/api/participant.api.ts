import * as express from "express";
import Project from "../models/project.model";
import Participant from "server/models/participant.model";
import Skill from "server/models/skill.model";

let router = express.Router();
//Router is namespaced in server.js to /api/sessions
export default function () {

   router.get("/self", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      Participant.find(req.user.id)
      .then( (participant) =>
      {
         res.send(participant);
      });
   });

   router.get("/list", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      Participant.findAll(req.user.id)
      .then( (participant) =>
      {
         res.send(participant);
      });
   });

   router.post("/add", function (req: express.Request, res: express.Response, next: express.NextFunction) {
      const {name} = req.body;
      const participant = {
         name: name
      } as Participant;
      Participant.create(participant)
      .then((Participant) => {
         res.send(Participant);
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
      
   });

   return router;

}