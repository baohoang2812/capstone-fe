import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin"],
  name: "CertificateType",
  dir: "CertificateType",
  pathRoot: "certificateType",
  title: (
    <span>
     <Icon type="safety-certificate" />
      <span>Certificate</span>
    </span>
  ),
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
      component: "Pages/CertificateTypeDetail",
      key: "certificateType-create-edit",
      showMenu: false,
      title: "Certificate Type detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "Certificate Type Management",
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
