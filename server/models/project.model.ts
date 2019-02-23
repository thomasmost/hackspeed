import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsToMany } from "sequelize-typescript";
import UserProject from "./user_project.model";
import User from "./user.model";
import Challenge from "./challenge.model"
import ChallengeProject from "./challenge_project.model";
import { BelongsTo } from "sequelize-typescript";
import { ForeignKey } from "sequelize-typescript";
import { HasMany } from "sequelize-typescript";
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
   logo: string;

   @Column
   git_url: string;

   @BelongsToMany(()=>User, ()=>UserProject)
   users: User[];

   @BelongsToMany(()=>Challenge, ()=>ChallengeProject)
   challenges: Challenge[];

   @HasMany(()=>Skill)
   required_effort: Skill[]
}