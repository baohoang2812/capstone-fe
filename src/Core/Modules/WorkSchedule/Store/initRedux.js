import { workSchedules, requestBooking } from "~/Core/Modules/WorkSchedule/Configs/Constants";

import list_workSchedules from "./reducers";
import list_requestBooking from "./reducers/requestBooking";

export default {
  [workSchedules]: list_workSchedules,
  [requestBooking]: list_requestBooking,
};
