import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AutoIncrement, HasOne, HasMany, BelongsToMany } from "sequelize-typescript";
import Project from "./project.model";
import UserProject from "./user_project.model";
import Skill from "./skill.model";

@Table({
   tableName: "user"
})
export default class User extends Model<User> {

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

   @BelongsToMany(() => Project, () => UserProject)
   projects: Project[];

   @HasMany(() => Skill)
   skills: Skill[];

}