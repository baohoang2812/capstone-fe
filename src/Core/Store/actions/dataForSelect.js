export const GET_DATA_FOR_SELECT_REQUEST = "GET_DATA_FOR_SELECT_REQUEST";
export const GET_DATA_FOR_SELECT_SUCCESS = "GET_DATA_FOR_SELECT_SUCCESS";
export const GET_DATA_FOR_SELECT_FAILURE = "GET_DATA_FOR_SELECT_FAILURE";
export const ADD_DATA_FOR_SELECT_SUCCESS = "ADD_DATA_FOR_SELECT_SUCCESS";
export const UPDATE_DATA_FOR_SELECT_SUCCESS = "UPDATE_DATA_FOR_SELECT_SUCCESS";

export function get_data_for_select_action(
  key,
  method,
  where = {},
  pageSize = 50
) {
  return {
    type: GET_DATA_FOR_SELECT_REQUEST,
    payload: { key, method, where, pageSize }
  }
}

export function set_data_for_select_action(
  key,
  list
) {
  return {
    type: GET_DATA_FOR_SELECT_SUCCESS,
    payload: { key, list }
  }
}

export function add_data_for_select_action(
  key,
  data
) {
  return {
    type: ADD_DATA_FOR_SELECT_SUCCESS,
    payload: { key, data }
  }
}

export function update_data_for_select_action(
  key,
  data,
  customFindKey,
  customFindValue,
) {
  return {
    type: UPDATE_DATA_FOR_SELECT_SUCCESS,
    payload: { key, data, customFindKey, customFindValue }
  }
}
