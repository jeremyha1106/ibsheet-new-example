import { COMMON_SELECT_SEARCH } from 'constants/apiUrl';
import { COMMON_SELECT_ROW_NUMBERS } from 'constants/common';
import apiClient from './apiClient';

export const getSelectList = params => {
  const { code, value, type } = params;
  const postParam = {
    direction: 'string',
    itemPerPage: COMMON_SELECT_ROW_NUMBERS,
    pageNum: 0,
    searchCriteria: {
      [code]: value,
    },
  };

  const uri = COMMON_SELECT_SEARCH.replace('{type}', type);
  return apiClient
    .post(uri, postParam)
    .then(response => response.data.content)
    .catch(err => {
      throw err;
    });
};
