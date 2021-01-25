import { employees, certification } from "~/Core/Modules/Employee/Configs/constants";

import list_employees from "./reducers";
import list_certification from "./reducers/Certification";

export default {
  [employees]: list_employees,
  [certification]: list_certification
};
