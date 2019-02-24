import { ForeignKey, Table, Model, PrimaryKey, AutoIncrement, Column } from "sequelize-typescript";
import User from "./user.model";
import Event from "./event.model";


@Table({
   tableName: "event_user"
})
export default class EventUser extends Model<EventUser> {


   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @ForeignKey(() => Event)
   @Column
   event_id: number;

   @ForeignKey(()=>User)
   @Column
   user_id: number;

}