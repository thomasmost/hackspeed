import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AutoIncrement, HasOne, HasMany, BelongsToMany } from "sequelize-typescript";
import Project from "./project.model";
import ParticipantProject from "./participant_project.model";
import Skill from "./skill.model";

@Table({
   tableName: "participant"
})
export default class Participant extends Model<Participant> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   name: string;

   @Column
   email: string;

   @Column
   phone_number: number;

   @Column
   twitter_handle: string;

   @CreatedAt
   created: Date;

   @UpdatedAt
   updated: Date;

   @BelongsToMany(()=>Project, ()=>ParticipantProject)
   projects: Project[];

   @HasMany(()=>Skill)
   skills: Skill[];

}