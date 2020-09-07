export const SUBMIT_CREATE_PROJECT = 'NEW_PROJECT/SUBMIT_CREATE_PROJECT';
export const SUBMIT_CREATE_PROJECT_SUCCESS =
  'NEW_PROJECT/SUBMIT_CREATE_PROJECT_SUCCESS';
export const SUBMIT_CREATE_PROJECT_FAILURE =
  'NEW_PROJECT/SUBMIT_CREATE_PROJECT_FAILURE';

export const UPDATE_LAST_ACTION = 'PROJECT/UPDATE_LAST_ACTION';

export const initialState = {
  initForm: {
    id: '',
    projectImg: '',
    projectName: '',
    projectKey: '',
    projectLead: '',
    jiraUrl: '',
    projectStatus: 'ACTIVE',
    avatar:
      'https://c7.uihere.com/files/7/618/505/avatar-icon-fashion-men-vector-avatar.jpg',
  },
};
