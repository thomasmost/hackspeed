import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, AutoIncrement, HasOne } from "sequelize-typescript";

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

   @HasOne(()=>Contact)
   contact: Contact;

   @CreatedAt
   created: Date;

   @UpdatedAt
   updated: Date;

}