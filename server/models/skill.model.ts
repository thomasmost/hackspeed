import { Table, Column, Model, PrimaryKey, ForeignKey, AutoIncrement, HasOne, Min, Max } from "sequelize-typescript";
import User from "./user.model";
import Project from "./project.model";

@Table({
   tableName: "skill"
})
export default class Skill extends Model<Skill> {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   category: string;

   @Column
   subcategory: string;

   @Min(1)
   @Max(20)
   @Column
   experience: number;

   @Min(0)
   @Column
   man_hours: number;

   @ForeignKey(() => Project)
   @Column
   project_id: number;

   @ForeignKey(() => User)
   @Column
   user_id: number;

}

export const DevelopmentSkills = [
   "React",
   "AngularJs",
   "Angular 2+",
   "C#",
   "Node",
   "Bootstrapping",
   "iOS",
   "Android",
   "Python",
   "Machine Learning",
   "Data Engineering",
   "Javascript"
];

export const DesignSkills = [
   "Visual",
   "Computer Interfaces",
   "Application",
   "Web Design"
];

export const ProductSkills = [
   "People Management",
   "Product Definition",
   "Triage"
];

export const Skills = {
   "Development": DevelopmentSkills,
   "Design": DesignSkills,
   "Product": ProductSkills
};
