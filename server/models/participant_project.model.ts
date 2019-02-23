import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
import Participant from "./participant.model";
import Skill from "./skill.model";
import Project from "./project.model";
@Table({
   tableName: "participant_project"
})
export default class ParticipantProject extends Model<ParticipantProject> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @ForeignKey(() => Participant)
   @Column
   participant_id: string;

   @ForeignKey(()=>Project)
   @Column
   project_id: string;

}