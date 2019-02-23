import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
import User from "./user.model";
import Skill from "./skill.model";
import Project from "./project.model";
@Table({
   tableName: "user_project"
})
export default class UserProject extends Model<UserProject> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @ForeignKey(() => User)
   @Column
   user_id: string;

   @ForeignKey(()=>Project)
   @Column
   project_id: string;

}