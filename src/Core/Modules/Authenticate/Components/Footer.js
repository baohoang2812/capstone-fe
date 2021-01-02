import React from "react";
import { Link } from "react-router-dom";

/* Context */
import AppContext from "~/Core/Providers/AppContext";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const Footer = () => {
  const t = useTranslate();

  return (
    <div className="footer">
      <div className="copyright">Copyright &copy; 2016 RubikBot Inc.</div>
      <AppContext.Consumer>
        {(context) => (
          <div className="mulpti-lang">
            <Link to="#" onClick={() => context.changeLanguage("vi")}>
              {t("CORE.LANG.VI")}
            </Link>
            <Link to="#" onClick={() => context.changeLanguage("en")}>
              {t("CORE.LANG.EN")}
            </Link>
          </div>
        )}
      </AppContext.Consumer>
    </div>
  );
}

export default Footer
