import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { getProjectsSuccess, getProjectsForUserSuccess, addProjectSuccess, ADD_PROJECT_REQUEST, UPDATE_PROJECT_NAME, DELETE_PROJECT_REQUEST, GET_PROJECT_LIST_REQUEST, GET_PROJECT_LIST_FOR_USER_SUCCESS, GET_PROJECT_LIST_FOR_USER_REQUEST, GET_PROJECT_LIST_FOR_EVENT_REQUEST, getProjectsForEventSuccess } from "./project.actions";
import Project from "server/models/project.model";
import { api } from "web/app/api";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchList() {
   try {
      const projects = yield call(function () {
         return api.send("/api/projects/list", {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            }
         }).then( (response) => {
            return response.json();
         });
      });
      yield put(getProjectsSuccess(projects));
   } catch (e) {
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

export function* getProjectsSaga() {
   yield takeLatest(GET_PROJECT_LIST_REQUEST, fetchList);
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchListForUser() {
   try {
      const projects = yield call(function () {
         return api.send("/api/projects/list_my", {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            }
         }).then( (response) => {
            return response.json();
         });
      });
      yield put(getProjectsForUserSuccess(projects));
   } catch (e) {
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

export function* getProjectsForUserSaga() {
   yield takeLatest(GET_PROJECT_LIST_FOR_USER_REQUEST, fetchListForUser);
}


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchListForEvent() {
   try {
      const projects = yield call(function () {
         return api.send("/api/projects/list_my", {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            }
         }).then( (response) => {
            return response.json();
         });
      });
      yield put(getProjectsForEventSuccess(projects));
   } catch (e) {
      // yield put({type: "FETCH_FAILED", message: e.message});
   }
}

export function* getProjectsForEventSaga() {
   yield takeLatest(GET_PROJECT_LIST_FOR_EVENT_REQUEST, fetchListForUser);
}


function* addProject(scene: any) {
   try {
      const newProject = yield call(function () {
         return api.send("/api/projects/add", {
            body: JSON.stringify(scene),
            method: "POST",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            }
         }).then( (response) => {
            return response.json();
         });
      });
      yield put(addProjectSuccess(newProject));
   } catch (e) {
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}
export function* addProjectSaga() {
  yield takeLatest(ADD_PROJECT_REQUEST, addProject);
}


function* updateName(payload: {scene:Project}) {
   try {
      const projects = yield call(function () {
         return api.send("/api/projects/update-name", {
            body: JSON.stringify(payload),
            method: "PUT",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            }
         }).then( (response) => {
            return response.json();
         });
      });
      yield put(getProjectsSuccess(projects));
   } catch (e) {
      // yield put({type: "FETCH_FAILED", message: e.message});
   }
}

export function* updateNameSaga() {
   // why?
  yield takeEvery(UPDATE_PROJECT_NAME as any, updateName);
}

function* deleteProject(payload: {id: number}) {
   try {
      const projects = yield call(function () {
         return api.send("/api/projects/single", {
            body: JSON.stringify(payload),
            method: "DELETE",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            }
         }).then( (response) => {
            return response.json();
         });
      });
      yield put(getProjectsSuccess(projects));
   } catch (e) {
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

export function* deleteProjectSaga() {
   // why?
  yield takeEvery(DELETE_PROJECT_REQUEST as any, deleteProject);
}