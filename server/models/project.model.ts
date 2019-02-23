import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import ParticipantToProject from "./participantToProject.model";

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

   @HasMany(()=>ParticipantToProject)
   participants: ParticipantToProject[];

   // @HasMany(()=>Skill)
   // required_effort: Skill[];

}