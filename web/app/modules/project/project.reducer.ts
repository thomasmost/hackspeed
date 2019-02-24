
import { ProjectState } from "./project.state";
import { GET_PROJECT_LIST_FOR_EVENT_SUCCESS, GET_PROJECT_LIST_FOR_USER_SUCCESS } from "./project.actions";

export function projectReducer(state: ProjectState = new ProjectState(), action: any): ProjectState {
   switch (action.type)
   {
      case GET_PROJECT_LIST_FOR_USER_SUCCESS:
      {
         return {...state, list: action.payload};
      }
      case GET_PROJECT_LIST_FOR_EVENT_SUCCESS:
      {
         return {...state, listForEvent: action.payload};
      }
      default:
      {
         return state;
      }
   }
}
