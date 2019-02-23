import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import ParticipantToProject from "./participant_project.model";
import { BelongsToMany } from "sequelize-typescript";
import Participant from "./participant.model";

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

   @BelongsToMany(()=>Participant, ()=>ParticipantToProject)
   participants: Participant[];

   // @HasMany(()=>Skill)
   // required_effort: Skill[];

}