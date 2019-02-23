import { Table, Column, Model, PrimaryKey, ForeignKey, AutoIncrement, HasOne } from "sequelize-typescript";
import Participant from "./participant.model";
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

   @Column
   experience: number;

   @ForeignKey(() => Project)
   @Column
   project_id: number;

   @ForeignKey(() => Participant)
   @Column
   participant_id: number;

}

export type SkillCategory = "development" | "design" | "project management"
