import User from "server/models/user.model";
import Event from "../models/event.model";

export const workingHoursForEvent = (user: User, event: Event) => {
   const nights = event.working_hours/24;
   return event.working_hours - (nights*user.hours_sleep);
}