import User from "../models/user.model";
import Event from "../models/event.model";
// import * as Promise from "bluebird";
import UserProject from "../models/user_project.model";

export const workingHoursForEvent = (user: User, event: Event) => {
   const nights = event.working_hours/24;
   return event.working_hours - (nights*user.hours_sleep);
}

export const uncommitedHoursForEvent = (user: User, event: Event) => {
   let workingHours = workingHoursForEvent(user, event);
   const commitmentsPromise = user.getProjectCommitments(event);

   return commitmentsPromise.then((commitments: UserProject[]) => {
      commitments.forEach((commitment) => {
         workingHours -= commitment.comitted_hours;
      });
      return workingHours;
   });
}