import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin","Branch Manager"],
  name: "Employee",
  dir: "Employee",
  pathRoot: "employee",
  title: (t) => {
    return (
    <span>
      <Icon type="user" />
      <span>{t("CORE.EMPLOYEE.TITLE")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: "profile",
      component: "Pages/Profile",
      key: "profile-edit",
      showMenu: false,
      title: "Profile",
    },
    {
      url: ":id",
      component: "Pages/EmployeeDetail",
      key: "employee-create-edit",
      showMenu: false,
      title: "CORE.EMPLOYEE.UPDATE.ACCOUNT"
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.EMPLOYEE.MANAGEMENT.TITLE",
    },
  ],
  redux: redux,
  sagas: sagas,
  lang: {
    vi: intlMessagesVi,
    en: intlMessagesEN,
  },
  isAuthenticate: true,
};
