import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsToMany, DataType } from "sequelize-typescript";
import UserProject from "./user_project.model";
import User from "./user.model";
import Challenge from "./challenge.model"
import ChallengeProject from "./challenge_project.model";
import { BelongsTo } from "sequelize-typescript";
import { ForeignKey } from "sequelize-typescript";
import { HasMany } from "sequelize-typescript";
import Skill from "./skill.model";
import EventUser from "./event_user.model";
import Project from "./project.model";

@Table({
   tableName: "event"
})
export default class Event extends Model<Event> {

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
   hosting_organization: string;

   @BelongsToMany(()=>User, ()=>EventUser)
   users: User[];

   @HasMany(()=>Challenge)
   challenges: Challenge[];

   @HasMany(()=>Project)
   projects: Project[];

   @Column
   start_time: Date;

   @Column
   end_time: Date;

   @Column({type: DataType.VIRTUAL, allowNull: false, get: this.getWorkingHours})
   working_hours: number;

   getWorkingHours(){
      return (this.start_time.valueOf() - this.end_time.valueOf()) * 1000 * 60 * 60;
   }
}