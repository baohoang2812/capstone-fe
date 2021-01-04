import React, { useState } from "react";
import { IntlProvider } from "react-intl";

/* Local data */
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/vi";

/* Context */
import AppContext from "./AppContext";

const InitProvider = ({
  listUrl,
  listLangVi,
  listLangEn,
  children
}) => {

  /* State */
  const [locale, setLocale] = useState(localStorage.getItem("lang") || "vi")

  const changeLanguage = (locale) => {
    localStorage.setItem("lang", locale);
    setLocale(locale);
  }

  return (
    <AppContext.Provider
      value={{
        listUrl: listUrl,
        changeLanguage: (locale) => changeLanguage(locale)
      }}
    >
      <IntlProvider
        locale={locale}
        messages={locale === "en" ? listLangEn : listLangVi}
        onError={(e) => console.log(e)}
      >
        {children}
      </IntlProvider>
    </AppContext.Provider>
  );
}

export default InitProvider;