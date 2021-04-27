import { attendance } from "~/Core/Modules/TakeAttendance/Configs/Constants";
import { timekeeping } from "~/Core/Modules/TakeAttendance/Configs/Constants2";
import list_attendance from "./reducers";
import list_timekeeping from "./reducers/index2";
export default {
  [attendance]: list_attendance,
  [timekeeping]: list_timekeeping,
};
