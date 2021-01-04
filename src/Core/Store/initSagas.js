import { fork } from "redux-saga/effects";

import adminTable from "./sagas/adminTable";
import dataForSelect from "./sagas/dataForSelect";

export default [
  fork(adminTable),
  fork(dataForSelect),
]
