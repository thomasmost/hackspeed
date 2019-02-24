import { Table, Column, Model, PrimaryKey, ForeignKey, AutoIncrement, HasOne, Min, Max } from "sequelize-typescript";
import User from "./user.model";
import Project from "./project.model";

@Table({
   tableName: "skill"
})
export default class Skill extends Model<Skill> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   category: SkillCategory;

   @Column
   name: string;

   @Min(1)
   @Max(20)
   @Column
   experience: number;

   @Min(0)
   @Column
   man_hours: number;

   @ForeignKey(() => Project)
   @Column
   project_id: number;

   @ForeignKey(() => User)
   @Column
   user_id: number;

}

export type SkillCategory = "development" | "design" | "project management"
