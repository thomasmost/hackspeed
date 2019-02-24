
export const GET_PROJECT_LIST_REQUEST = "GET_PROJECT_LIST_REQUEST";
export const GET_PROJECT_LIST_FAILURE = "GET_PROJECT_LIST_FAILURE";
export const GET_PROJECT_LIST_SUCCESS = "GET_PROJECT_LIST_SUCCESS";
import Project from "server/models/project.model";

export const ADD_PROJECT_REQUEST = "ADD_PROJECT_REQUEST";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const UPDATE_PROJECT_NAME = "UPDATE_PROJECT_NAME";
export const DELETE_PROJECT_REQUEST = "DELETE_PROJECT_REQUEST";

export const GET_PROJECT_LIST_FOR_USER_REQUEST = "GET_PROJECT_LIST_FOR_USER_REQUEST";
export const GET_PROJECT_LIST_FOR_USER_SUCCESS = "GET_PROJECT_LIST_FOR_USER_SUCCESS";

export const GET_PROJECT_LIST_FOR_EVENT_REQUEST = "GET_PROJECT_LIST_FOR_EVENT_REQUEST";
export const GET_PROJECT_LIST_FOR_EVENT_SUCCESS = "GET_PROJECT_LIST_FOR_EVENT_SUCCESS";
// export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";


export const getProjects = () => {
   return {
      type: GET_PROJECT_LIST_REQUEST
   };
};

export const getProjectsSuccess = (projects: any[]) => {
   return {
      type: GET_PROJECT_LIST_SUCCESS,
      payload: projects
   };
};


export const getProjectsForUser = () => {
   return {
      type: GET_PROJECT_LIST_FOR_USER_REQUEST
   };
};

export const getProjectsForUserSuccess = (projects: any[]) => {
   return {
      type: GET_PROJECT_LIST_FOR_USER_SUCCESS,
      payload: projects
   };
};
export const getProjectsForEvent = () => {
   return {
      type: GET_PROJECT_LIST_FOR_EVENT_REQUEST
   };
};

export const getProjectsForEventSuccess = (projects: any[]) => {
   return {
      type: GET_PROJECT_LIST_FOR_EVENT_SUCCESS,
      payload: projects
   };
};


export const addProject = (name: string) => {
   return {
      type: ADD_PROJECT_REQUEST,
      payload: name
   };
};

export const addProjectSuccess = (projects: any[]) => {
   return {
      type: ADD_PROJECT_SUCCESS
   };
};

export const deleteProject = (project: Project) => {
   return {
      type: DELETE_PROJECT_REQUEST,
      payload: project.id
   };
};
