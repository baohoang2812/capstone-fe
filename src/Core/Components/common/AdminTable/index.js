import "./index.less";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Table } from "antd";
import { injectIntl } from "react-intl";

/* Components */
import AdminTableFilters from "./Filters";
import AdminTableAction from "./Action";
import AdminTableActionSelectedAll from "./Action/SelectedAll";

/* Actions */
import {
  get_identity_table_data_action,
  set_default_identity_table_data_action,
  clear_identity_table
} from "~/Core/Store/actions/adminTable";

/* Selectors */
import { create_loading_error_selector } from "~/Core/Store/selectors/loadingError";
import { select_identity_table_dynamic_key } from "~/Core/Store/selectors/adminTable";

const AdminTable = ({
  stillRefreshWhenDataExist,
  clearTableAfterChangeRoute,
  defaultPrefixRouteKey,
  defs,
  refreshKey,
  showCheckbox,
  disableAllCheckbox,
  disableCheckboxKey,
  disableCheckboxFunction,
  disableClassKey,
  disableClassMode,
  showPagination,
  showHeaderAction,
  loadingProps,
  loadingType,
  scroll,
  api,
  method,
  identity,
  intl,
  defaultSorter,
  defaultPageSize,
  whereOr,
  whereAnd,
  rowKey,
  rowKeys,
  rowKeysChange,
  modeRowKeys,
  mappingRowKey,
  customDefaultActionIcon,
  customDefaultActionTitle,
  modeCustomAction,
  customAction,
  afterDeleteSuccess,
  treeMode,
  treeKey,
  expandIconColumnIndex,
  defaultDataSource,
  dynamicMode,
  dynamicKey,
  scrollToFirstRowOnChange,
  dataForSelectorKey
}) => {

  const history = useHistory();

  /* State */
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [prefixRouteKey] = useState(defaultPrefixRouteKey || history.location.pathname.split("/")[1]);

  /* Redux */
  const dispatch = useDispatch();
  let loading = useSelector(state => create_loading_error_selector([
    `${identity}_GET_IDENTITY_TABLE_DATA`
  ])(state.LoadingHandler));
  const error = useSelector(state => create_loading_error_selector([
    `${identity}_GET_IDENTITY_TABLE_DATA`
  ])(state.ErrorsHandler));

  /* Identity data */
  let identityData;
  if (dynamicMode) {
    identityData = useSelector(select_identity_table_dynamic_key(identity, dynamicKey));
  } else {
    identityData = useSelector(state => state[identity]);
  }

  const { list, treeList, pagination, filters, sorter, extendsData, hash } = identityData;

  /* ComponentDidMount. DidUpdate when change identity, refreshKey, whereOr, whereAnd, need get new data */
  useEffect(() => {
    if (Array.isArray(defaultDataSource)) {
      dispatch(set_default_identity_table_data_action(identity, defaultDataSource, undefined, undefined, dynamicKey));
    } else {
      let current = 1,
          pageSize = defaultPageSize;
    
      if (pagination.total !== 0) {
        current = pagination.current;
        pageSize = pagination.pageSize;
      }
  
      if (stillRefreshWhenDataExist) {
        getData(current, pageSize, defaultSorter, filters);
      } else if (list.length === 0) {
        getData(current, pageSize, defaultSorter, filters);
      }
    }

    return () => {
      const { pathname } = history.location;

      if (clearTableAfterChangeRoute && !pathname.includes(prefixRouteKey)) {
        dispatch(clear_identity_table(identity))
      }
    }
  }, [identity, refreshKey, JSON.stringify(defaultDataSource), JSON.stringify(whereOr), JSON.stringify(whereAnd)])

  // Trigger when change rowKeys outside component
  useEffect(() => {
    if (JSON.stringify(rowKeys) !== JSON.stringify(selectedRowKeys)) {
      setSelectedRowKeys(rowKeys);
    }
  }, [rowKeys])

  // Trigger scroll to top when change pagination, filters, sorter
  useEffect(() => {
    const table = document.querySelector(".ant-table-body");
    if (scrollToFirstRowOnChange && !loading && table && table.scrollTop !== 0) {
      table.scrollTop = 0;
    }
  }, [JSON.stringify(pagination), JSON.stringify(filters), JSON.stringify(sorter)])

  const getData = (current, pageSize, sorter, filters) => {
    dispatch(
      get_identity_table_data_action(
        identity, api, current, pageSize, sorter, { whereOr, whereAnd }, filters, method.list,
        treeMode, treeKey, dynamicKey, dataForSelectorKey
      )
    )
  }

  // Select all children key in tree mode
  const getRowKeysChildren = (children, result = []) => {
    if (!children || !children.length) return result;
    
    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      result.push(item[rowKey]);
      getRowKeysChildren(item.children, result);
    }

    return result;
  }

  // Select all parent key
  const getRowKeysParent = (parent_id, result = []) => {
    if (!parent_id) return result;

    result.push(parent_id);
    const parent = list.find((item) => item.id === parent_id);

    if (parent && parent.parent_id !== null) {
      return getRowKeysParent(parent.parent_id, result);
    } else {
      return getRowKeysParent(null, result);
    }
  }
  
  // Trigger when click on checkbox
  const onSelect = (record, selected) => {
    let newSelectedRowKeys = [];

    // Radio mode
    if (modeRowKeys === "radio") {
      newSelectedRowKeys = [record[rowKey]];
      setSelectedRowKeys(newSelectedRowKeys);
      if (rowKeysChange) { rowKeysChange(newSelectedRowKeys); }
      return;
    }

    // Select
    if (selected) {
      if (treeMode && record.children) {
        const allRowKeysChildren = getRowKeysChildren(record?.children);
        newSelectedRowKeys = [...selectedRowKeys, ...allRowKeysChildren, record[rowKey]];
        newSelectedRowKeys = [...new Set(newSelectedRowKeys)]; // Remove duplicate
      } else {
        newSelectedRowKeys = [...selectedRowKeys, record[rowKey]];
      }

      setSelectedRowKeys(newSelectedRowKeys);
      if (rowKeysChange) { rowKeysChange(newSelectedRowKeys); }
      return;
    }

    // Deselect
    if (treeMode) {
      const allRowKeysChildren = getRowKeysChildren(record?.children);
      const allRowKeysParent = getRowKeysParent(record.parent_id);
      newSelectedRowKeys = selectedRowKeys.filter((key) => {
        if (
          key === record[rowKey] ||
          allRowKeysChildren.includes(key) ||
          allRowKeysParent.includes(key)
        ) return false;

        return true;
      });
    } else {
      newSelectedRowKeys = selectedRowKeys.filter((key) => key !== record[rowKey]);
    }

    setSelectedRowKeys(newSelectedRowKeys);
    if (rowKeysChange) { rowKeysChange(newSelectedRowKeys); }
  }

  // Trigger when select all
  const onSelectAll = (_, selectedRows) => {
    let newSelectedRowKeys;

    if (disableCheckboxFunction && typeof disableCheckboxFunction === "function") {
      newSelectedRowKeys = selectedRows.reduce((prev, row) => {
        const { disabled } = disableCheckboxFunction(row, hash, selectedRows[0][rowKey]);
        if (!disabled) prev.push(row[rowKey]);

        return prev;
      }, []);
    } else {
      newSelectedRowKeys = selectedRows.map((row) => row[rowKey]);
    }

    setSelectedRowKeys(newSelectedRowKeys);

    if (rowKeysChange) { rowKeysChange(newSelectedRowKeys); }
  }

  const removeSelectedAll = useCallback(() => {
    setSelectedRowKeys([]);

    if (rowKeysChange) { rowKeysChange([]); }
  }, [])

  // Trigger when change filter
  const handleFilterChange = (nextFilters) => {
    const newFilters = { ...filters, ...nextFilters };
    getData(1, pagination.pageSize, sorter, newFilters);
  }

  // Trigger when change pagination, sort
  const handleTableChange = (nextPagination, _, nextSorter = {}) => {
    const newPagination = { ...pagination, ...nextPagination };
    let newSorter = defaultSorter;

    if (nextSorter.columnKey) {
      newSorter = { [nextSorter.columnKey]: nextSorter.order === "ascend" ? 1 : -1 }
    }

    getData(newPagination.current, newPagination.pageSize, newSorter, filters);
  }

  // Trigger after delete success
  const refreshDataAfterDelete = useCallback(() => {
    getData(pagination.current, pagination.pageSize, defaultSorter);
    setSelectedRowKeys([]);
  }, [pagination.current, pagination.pageSize])

  const t = useCallback((id, defaultMessage, values = {}) => {
    return intl.formatMessage({ id, defaultMessage }, values);
  }, [])

  // Generate columns
  const columns = useMemo(() => defs.map((define) => {
    const { title, key, dataIndex, fieldType, className, width, fixed, sorter, render, selectParams } = define;

    let column = {
      title,
      key,
      width,
      fixed,
      sorter,
      className,
      children: [
        {
          title: <AdminTableFilters
            fieldType={fieldType}
            fieldKey={key}
            handleFilterChange={handleFilterChange}
            params={selectParams ? selectParams(extendsData) : []}
            defaultValue={filters[key]}
          />,
          key,
          dataIndex,
          width,
          className: `${className}`,
          render: render ? (columnData, record) => render(columnData, record, extendsData) : undefined
        }
      ]
    }

    return column;
  }), [defs, pagination.pageSize, JSON.stringify(sorter), JSON.stringify(filters)], JSON.stringify(extendsData));

  // Handle dataSource
  const dataSource = treeMode ? treeList : list;

  if (loadingProps !== undefined) {
    if (loadingType === "merge") {
      loading = loadingProps || loading;
    } else {
      loading = loadingProps;
    }
  }

  // Handle check row
  const rowSelection = showCheckbox ? {
    selectedRowKeys,
    onSelect: onSelect,
    onSelectAll: onSelectAll,
    getCheckboxProps: (record) => {
      if (disableAllCheckbox) {
        return { disabled: true }
      }

      if (disableCheckboxFunction && typeof disableCheckboxFunction === "function") {
        return disableCheckboxFunction(record, hash, selectedRowKeys[0]);
      }

      return { disabled: record[disableCheckboxKey] }
    },
    type: modeRowKeys
  } : undefined;

  // Pagination
  pagination.showTotal = (total, range) => t("TABLE.ROW.show_of_row", undefined, {
    range_one: range[0],
    range_two: range[1],
    total
  });

  // Scroll
  const tableScroll = {
    y: `calc(100vh - (178px))`,
    ...scroll,
    scrollToFirstRowOnChange: false
  }

  // Mapping row keys
  let rowKeyFunction = record => record[rowKey];

  if (mappingRowKey && typeof mappingRowKey === "function") {
    rowKeyFunction = mappingRowKey;
  }

  return error ? (
    <Redirect to="/500" />
  ) : (
    <div className="admin-table">
      {
        showHeaderAction && (
          <AdminTableAction
            t={t}
            selectedRowKeys={selectedRowKeys}
            apiDelete={api[method.delete || "deleteByIds"]}
            refreshDataAfterDelete={refreshDataAfterDelete}
            afterDeleteSuccess={afterDeleteSuccess}
            customDefaultActionIcon={customDefaultActionIcon}
            customDefaultActionTitle={customDefaultActionTitle}
            modeCustomAction={modeCustomAction}
            customAction={customAction}
          />
        )
      }
      <AdminTableActionSelectedAll
        selectedAll={list.length !== 0 && selectedRowKeys.length === list.length}
        selectedRowKeysLength={
          // Prevent re-render if selectedRowKeys length !== list length
          selectedRowKeys.length === list.length ? selectedRowKeys.length : 0
        }
        removeSelectedAll={removeSelectedAll}
        t={t}
      />
      <Table
        className="table-striped"
        locale={{ emptyText: t("CORE.noData") }}
        rowKey={rowKeyFunction}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        bordered={true}
        pagination={showPagination && pagination}
        scroll={tableScroll}
        rowSelection={rowSelection}
        onChange={handleTableChange}
        expandIconColumnIndex={expandIconColumnIndex}
        rowClassName={record => disableClassMode === "toggle" ?
            (record[disableClassKey] ? "" : "admim-table-disabled-row")
          :
            (record[disableClassKey] ? "admim-table-disabled-row" : "")
        }
      />
    </div>
  )
}

AdminTable.defaultProps = {
  defs: [],
  showCheckbox: true,
  showPagination: true,
  showHeaderAction: true,
  loadingType: "merge",
  method: {},
  stillRefreshWhenDataExist: true,
  scroll: {},
  scrollToFirstRowOnChange: true,
  defaultPageSize: 50,
  defaultSorter: { created_at: -1 },
  rowKey: "id",
  rowKeys: [],
  modeRowKeys: "checkbox",
  modeCustomAction: "merge",
  treeMode: false,
  treeKey: "parent_id",
  expandIconColumnIndex: 1,
  disableClassKey: "is_disable",
  clearTableAfterChangeRoute: true
}

export default React.memo(injectIntl(AdminTable));
