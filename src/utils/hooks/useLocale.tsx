import { useEffect } from "react";
import i18n from "i18next";
import { dateLocales } from "locales";
import dayjs from "dayjs";
import { useAppSelector } from "store/hooks";
import { noop } from "../../components/ui/utils/constant";

function useLocale() {
  const locale = useAppSelector((state) => state.locale.currentLang);

  useEffect(() => {
    const formattedLang = locale.replace(/-([a-z])/g, function (g: string) {
      return g[1].toUpperCase();
    });
    if (locale !== i18n.language) {
      i18n.changeLanguage(formattedLang).then(() => noop());
    }
    dateLocales[formattedLang]().then(() => {
      dayjs.locale(formattedLang);
    });
  }, [locale]);

  return locale;
}

export default useLocale;
