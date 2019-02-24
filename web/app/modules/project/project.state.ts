import Project from "server/models/project.model";

export class ProjectState {
   public list: Project[];
   public listForEvent: Project[];
   constructor() {
      this.list = [];
      this.listForEvent = [];
   }
}