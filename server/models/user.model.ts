import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AutoIncrement, HasOne, HasMany, BelongsToMany } from "sequelize-typescript";
import Project from "./project.model";
import UserProject from "./user_project.model";
import Skill from "./skill.model";
import Event from "./event.model";

@Table({
   tableName: "user"
})
export default class User extends Model<User> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   auth_zero_access_token: string;

   @Column
   name: string;

   @Column
   email: string;

   @Column
   handle: string;

   @Column
   phone_number: number;

   @Column
   twitter_handle: string;

   @CreatedAt
   created: Date;

   @UpdatedAt
   updated: Date;

   @Column
   hours_sleep: number;

   @BelongsToMany(() => Project, () => UserProject)
   projects: Project[];

   @HasMany(() => Skill)
   skills: Skill[];

   getProjectCommitments(event: Event){
      return UserProject.findAll({
         where: {
            user_id: this.id,
            event_id: event.id
         }
      });
   }

}