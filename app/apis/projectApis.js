import apiClient from './apiClient';

const BASE_PROJECT_MANAGEMENT = `/projects`;
const GET_PROJECT_LIST = `${BASE_PROJECT_MANAGEMENT}/search`;
const GET_PROJECT_ID = projectId => `${BASE_PROJECT_MANAGEMENT}/${projectId}`;
const SET_ACTIVE_PROJECT = projectId =>
  `${BASE_PROJECT_MANAGEMENT}/${projectId}/active`;
const SET_INACTIVE_PROJECT = projectId =>
  `${BASE_PROJECT_MANAGEMENT}/${projectId}/deactive`;

export const getProjectList = ({ params }) =>
  apiClient
    .post(GET_PROJECT_LIST, params)
    .then(response => response.data)
    .catch(err => {
      console.error('Error search projects:', err);
      throw err;
    });

export const getProjectItem = projectId =>
  apiClient
    .get(GET_PROJECT_ID(projectId))
    .then(response => response.data)
    .catch(err => {
      console.error('Error get project selected:', err);
      throw err;
    });

export const createProject = param =>
  apiClient
    .post(BASE_PROJECT_MANAGEMENT, param)
    .then(response => ({ response }))
    .catch(err => {
      console.error('Error get project:', err);
      throw err;
    });
export const updateProject = param =>
  apiClient
    .put(`${BASE_PROJECT_MANAGEMENT}/${param.id}`, param)
    .then(response => ({ response }))
    .catch(err => {
      console.error('Error get project:', err);
      throw err;
    });

export const getProjectById = id =>
  apiClient
    .get(`${BASE_PROJECT_MANAGEMENT}/${id}`)
    .then(response => response.data)
    .catch(err => {
      console.error('Error /get:', err);
      throw err;
    });

export const assignUser = param =>
  apiClient
    .put(`${BASE_PROJECT_MANAGEMENT}/${param.id}/assign`, param.body)
    .then(response => ({ response }))
    .catch(err => {
      console.error('Error /get:', err);
      throw err;
    });
export const unAssignUser = param =>
  apiClient
    .put(`${BASE_PROJECT_MANAGEMENT}/${param.id}/unAssign`, param.body)
    .then(response => ({ response }))
    .catch(err => {
      console.error('Error /get:', err);
      throw err;
    });

export const setActiveProject = projectId =>
  apiClient
    .put(SET_ACTIVE_PROJECT(projectId))
    .then(response => response.data)
    .catch(err => {
      console.error('Error set active project:', err);
      throw err;
    });

export const setInactiveProject = projectId =>
  apiClient
    .put(SET_INACTIVE_PROJECT(projectId))
    .then(response => response.data)
    .catch(err => {
      console.error('Error set inactive project:', err);
      throw err;
    });
