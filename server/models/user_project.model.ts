import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
import User from "./user.model";
import Project from "./project.model";
import Skill from "./skill.model";
import Event from "./event.model";
@Table({
   tableName: "user_project"
})
export default class UserProject extends Model<UserProject> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   comitted_hours: number;

   @ForeignKey(() => User)
   @Column
   user_id: number;

   @ForeignKey(()=>Project)
   @Column
   project_id: number;

   @ForeignKey(() => Event)
   @Column
   event_id: number;

   @ForeignKey(() => Skill)
   @Column
   user_skill_id: number;

   @ForeignKey(() => Skill)
   @Column
   project_skill_id: number;

}