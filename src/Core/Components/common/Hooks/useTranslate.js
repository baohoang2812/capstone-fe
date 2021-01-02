import { useIntl } from "react-intl";

const useTranslate = (lang) => {
  const intl = useIntl();

  const t = (id, defaultMessage, values = {}) => {
    return intl.formatMessage({ id, defaultMessage }, values);
  }

  if (lang) {
    return [t, intl.locale]
  }

  return t;
}

export default useTranslate;
