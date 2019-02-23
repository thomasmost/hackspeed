import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import Participant from "./participant.model";
import Skill from "./skill.model";
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
   logo: ImageBitmap;

   @Column
   git_url: string;

   @HasMany(()=>Participant)
   participants: Participant[];

   @HasMany(()=>Skill)
   required_effort: Skill[];

}