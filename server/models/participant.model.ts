import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AutoIncrement, HasOne, HasMany } from "sequelize-typescript";
import ParticipantToProject from "./participant_project.model";

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

   @HasMany(()=>ParticipantToProject)
   projects: ParticipantToProject[];




}