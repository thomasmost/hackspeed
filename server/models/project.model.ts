import UserProject from "./user_project.model";
import User from "./user.model";
import Event from "./event.model";
import Challenge from "./challenge.model";
import ChallengeProject from "./challenge_project.model";

import Skill from "./skill.model";
import * as userHelper from "../helpers/user.helper";
import * as skillHelper from "../helpers/skill.helper";
import { Table, Model, PrimaryKey, AutoIncrement, Column, BelongsToMany, HasMany, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";


@Table({
   tableName: "project"
})
export default class Project extends Model<Project> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   name: string;

   @Column
   description: string;

   @Column
   logo: string;

   @Column
   git_url: string;

   @Column
   views: number;

   @BelongsToMany(()=>User, ()=>UserProject)
   users: User[];

   @BelongsToMany(()=>Challenge, ()=>ChallengeProject)
   challenges: Challenge[];

   @HasMany(()=>Skill)
   required_effort: Skill[];

   @ForeignKey(()=>Event)
   event_id: string;

   @BelongsTo(()=>Event)
   event: Event;

   @HasMany(() => UserProject)
   commitments: UserProject[];

   @Column({type: DataType.VIRTUAL, get: Project.getRemainingEffort})
   remaining_effort: Skill[];

   static getRemainingEffort(this: Project) {
      return (this.required_effort || []).map((skill) => {
         const skillCopy = Object.assign(Skill.build(), skill);
         this.commitments.forEach((commitment) => {
            if (commitment.project_skill_id === skillCopy.id){
               skillCopy.man_hours -= commitment.comitted_hours;
            }
         });
      });
   };
}