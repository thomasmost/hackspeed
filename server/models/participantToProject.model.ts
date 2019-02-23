import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
import Participant from "./participant.model";
import Skill from "./skill.model";
import Project from "./project.model";
@Table({
   tableName: "project"
})
export default class ParticipantToProject extends Model<ParticipantToProject> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @ForeignKey(() => Participant)
   participant_id: string;

   @ForeignKey(()=>Project)
   project_id: string;

}