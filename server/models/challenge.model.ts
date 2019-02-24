import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AutoIncrement, BelongsTo, BelongsToMany, ForeignKey } from "sequelize-typescript";
import ChallengeProject from "./challenge_project.model";
import Project from "./project.model";
import Event from "./event.model";

@Table({
   tableName: "challenge"
})
export default class Challenge extends Model<Challenge> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   name: string;

   @Column
   description: string;

   @Column
   prize: number;

   // @BelongsTo(() => Event)
   // event: Event;

   @Column
   logo: string;

   @BelongsToMany(()=>Project, ()=>ChallengeProject)
   projects: Project[];

   @ForeignKey(()=>Event)
   event_id: string;

   @CreatedAt
   created: Date;

   @UpdatedAt
   updated: Date;

}