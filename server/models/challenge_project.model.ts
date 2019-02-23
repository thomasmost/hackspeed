import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
import Project from "./project.model";
import Challenge from "./challenge.model";
@Table({
   tableName: "challenge_project"
})
export default class ChallengeProject extends Model<ChallengeProject> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @ForeignKey(() => Challenge)
   @Column
   challenge_id: string;

   @ForeignKey(() => Project)
   @Column
   project_id: string;

}