import { reports, violations } from "~/Core/Modules/Report/Configs/Constants";

import list_reports from "./reducers";
import list_violations from "./reducers/Violation";

export default {
  [reports]: list_reports,
  [violations]: list_violations
};
