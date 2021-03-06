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
  title: (t) => {
    return (
    <span>
      <Icon type="safety-certificate" />
      <span>{t("CORE.CERTIFICATE")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: ":id",
      component: "Pages/CertificateTypeDetail",
      key: "certificateType-create-edit",
      showMenu: false,
      title: "CORE.CERTIFICATE.DETAIL",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.CERTIFICATE.TYPE.MANAGEMENT.TITLE",
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
