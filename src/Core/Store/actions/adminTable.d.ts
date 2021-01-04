import { get_action_table } from "~/Core/utils/redux/adminTable";

export const GET_IDENTITY_TABLE_DATA_REQUEST: string;
export const GET_IDENTITY_TABLE_DATA_SUCCESS: string;
export const GET_IDENTITY_TABLE_DATA_FAILURE: string;
export const ADD_IDENTITY_TABLE_DATA_SUCCESS: string;
export const UPDATE_IDENTITY_TABLE_DATA_SUCCESS: string;

export function get_identity_table_data_action(
  identity: string,
  api: () => {},
  current: number,
  pageSize: numer,
  sorter: object,
  defaultFilter: object,
  filters: object,
  method: "getList" | string,
  treeMode: boolean,
  treeKey: "parent_id"
) : {
  type: string,
  payload: {
    identity: string,
    api: () => {},
    current: number,
    pageSize: numer,
    sorter: object,
    defaultFilter: object,
    filters: object,
    method: "getList" | string,
    treeMode: boolean,
    treeKey: "parent_id" | string;
  }
}

export function set_default_identity_table_data_action(
  identity: string,
  list: Array<any>,
  treeMode: boolean,
  treeKey: "parent_id",
  dynamicKey: string
) : {
  type: string,
  payload: {
    list: Array<any>,
    treeMode: boolean,
    treeKey: "parent_id" | string,
    dynamicKey: string
  }
}

export function add_identity_table_data_success(identity: string, res: any, dynamicKey: string) : {
  type: string,
  payload: { res: any, dynamicKey: string }
}

export function update_identity_table_data_success(
  identity: string,
  recordUpdate: { id: string, column: string, data: any, rowMode: boolean },
  dynamicKey: string
) : {
  type: string,
  payload: { id: string, column: string, data: any, rowMode: boolean, dynamicKey: string }
}

export function update_identity_table_many_data_success(
  identity: string,
  ids: Array<string>,
  recordUpdate: { column: string, data: any, rowMode: boolean },
  dynamicKey: string
) : {
  type: string,
  payload: { ids: Array<string>, column: string, data: any, rowMode: boolean, dynamicKey: string }
}

export function clear_identity_table(
  identity: string,
  dynamicKey: string
) : {
  type: string,
  payload: { dynamicKey: string }
}