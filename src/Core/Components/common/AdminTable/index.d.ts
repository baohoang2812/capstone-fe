import * as React from "react";

export interface Props {
  defs: Array<any>;
  refreshKey: string | number; // Pass new refresh key if you want re render table
  showCheckbox: boolean;
  disableAllCheckbox: boolean,
  disableCheckboxKey: string,
  disableCheckboxFunction: (record: any, hash: any, firstSelectedRowKeys: string) => Object<{ disabled: boolean }>
  disableClassKey: string,
  showPagination: boolean;
  showHeaderAction: boolean;
  loadingProps: boolean;
  loadingType: "merge" | "override";
  stillRefreshWhenDataExist: boolean; // Have call API when data exists?
  clearTableAfterChangeRoute: boolean; // Clear data when change other router not belong prefix route
  defaultPrefixRouteKey: string;
  scroll: {
    x: number,
    y: number
  };
  scrollToFirstRowOnChange: boolean;
  api: {
    getList: () => Promise<{ list: Array<any>, totalRows: number, extendsData?: any }>, // method name in method.list
    deleteByIds: () => Promise<{ deletedIds: Array<string> }> // // method name in method.delete
  };
  identity: string;
  method: {
    list: string | "getList",
    delete: string | "deleteByIds"
  };
  defaultPageSize: number;
  defaultSorter: object;
  whereOr: object;
  whereAnd: object;
  rowKey: string | "id";
  rowKeys: Array<string>;
  rowKeysChange: (ids: Array<string>) => void;
  modeRowKeys: "radio" | "checkbox";
  mappingRowKey: (record: any) => string | number;
  afterDeleteSuccess: (deletedIds: Array<string>) => void;
  customDefaultActionIcon: string;
  customDefaultActionTitle: string;
  modeCustomAction: "merge" | "override",
  customAction: Array<{ icon: string, title: string, action: () => void }>;
  treeMode: boolean;
  treeKey: string | "parent_id";
  expandIconColumnIndex: number;
  defaultDataSource: Array<any>; // Pass default data will don't call API get data when componentDidMount, and componentDidUpdate
  dynamicMode: boolean; // Dynamic mode for multi table using one reducer
  dynamicKey: string;
  dataForSelectorKey: string; // use this data for selector
}

export interface State {
  selectedRowKeys: Array<string>;
}

export default class AdminTable extends React.Component<Props, State> {
  static defaultProps: {
    defs: Array<any>;
    rowKey: string | "id";
    rowKeys: Array<string>;
    showCheckbox: boolean;
    showPagination: boolean;
    showHeaderAction: boolean;
    loadingType: "merge";
    scroll: object;
    modeRowKeys: "checkbox";
    modeCustomAction: "merge";
    treeMode: boolean;
    treeKey: "parent_id";
    expandIconColumnIndex: number;
    clearTableAfterChangeRoute: boolean;
  };

  state: {
    selectedRowKeys: Array<string>;
  };
}
