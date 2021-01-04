import { takeEvery, call, put, all } from "redux-saga/effects";
import { message } from "antd";

/* Configs */
import { currentEnvName } from "~/Configs";

/* Actions */
import * as actions from "~/Core/Store/actions/dataForSelect";

function* get_data_for_select_worker({ payload }) {
  const { key, method, where, pageSize } = payload;

  const filters = {
    pageIndex: 1,
    pageSize,
    where: Array.isArray(where) ? where : [where]
  }

  try {
    const res = yield call(method, filters);
    const payload = { key, list: res.list };

    yield put({ type: actions.GET_DATA_FOR_SELECT_SUCCESS, payload });
  } catch (error) {
    if (currentEnvName !== "production") {
      console.error(error.response?.data);
    }
    message.error("Có lỗi xảy ra, không thể lấy dữ liệu");
    yield put({ type: actions.GET_DATA_FOR_SELECT_FAILURE });
  }
}

export function* get_data_for_select_watcher() {
  yield takeEvery(actions.GET_DATA_FOR_SELECT_REQUEST, get_data_for_select_worker)
}

export default function* () {
  yield all([
    get_data_for_select_watcher()
  ]);
}