import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AutoIncrement, HasOne } from "sequelize-typescript";

@Table({
   tableName: "skill"
})
export default class Skill extends Model<Skill> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   category: SkillCategory;

   @Column
   name: string;

   @Column
   experience: number;

}

export type SkillCategory = "development" | "design" | "project management"
