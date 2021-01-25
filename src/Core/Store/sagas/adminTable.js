import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { message } from "antd";

/* Configs */
import { currentEnvName } from "~/Configs";

/* Actions */
import * as actions from "~/Core/Store/actions/adminTable";
import { GET_DATA_FOR_SELECT_SUCCESS } from "~/Core/Store/actions/dataForSelect";

/* Selector */
import { select_option_data_for_select_fields } from "~/Core/Store/selectors/dataForSelect";

import { get_action_table } from "~/Core/utils/redux/adminTable";

function* get_indentity_table_data_worker({ payload }) {
  const {
    identity,
    api,
    method,
    current,
    pageSize,
    sorter,
    defaultFilter,
    filters,
    treeMode,
    treeKey,
    dynamicKey,
    dataForSelectorKey
  } = payload;

  const where = Object.keys(filters).reduce((prev, key) => {
    const fil = filters[key];

    if (fil.operator === "reset") {
      delete filters[key];
      return prev;
    }

    let filter;

    if (fil.type === "date" && fil.operator === "eq") {
      filter = { $between: fil.value };
    } else if (fil.type === "date" && fil.operator === "ne") {
      filter = { $nbetween: fil.value };
    } else {
      filter = { [`$${fil.operator}`]: fil.value };
    }

    prev.push({ [key]: filter });
    return prev;
  }, []);

  if (defaultFilter.whereAnd) {
    where.push(defaultFilter.whereAnd);
  }

  const opts = { pageIndex: current, pageSize, where, order: sorter };

  yield put({ type: get_action_table(identity, actions.GET_IDENTITY_TABLE_DATA_REQUEST) }); // Trigger loading

  try {
    const { data: res } = yield call(api[method], opts);
    const payload = {
      list: res.result,
      extendsData: res.extendsData,
      pagination: { current, pageSize, total: res.total },
      filters,
      sorter,
      treeMode,
      treeKey,
      dynamicKey
    }
    
    yield put({ type: get_action_table(identity, actions.GET_IDENTITY_TABLE_DATA_SUCCESS), payload });

    // Use data for select
    const exists = yield select(select_option_data_for_select_fields(dataForSelectorKey));
    if (dataForSelectorKey && exists.length === 0) {
      yield put({ type: GET_DATA_FOR_SELECT_SUCCESS, payload: { key: dataForSelectorKey, list: res.result } });
    }
  } catch (error) {
    if (currentEnvName !== "production") {
      console.error(error.response?.data);
    }
    message.error("Lỗi máy chủ");
    yield put({ type: get_action_table(identity, actions.GET_IDENTITY_TABLE_DATA_FAILURE) });
  }
}

export function* get_indentity_table_data_watcher() {
  yield takeEvery(actions.GET_IDENTITY_TABLE_DATA_REQUEST, get_indentity_table_data_worker)
}

export default function* () {
  yield all([
    get_indentity_table_data_watcher()
  ]);
}