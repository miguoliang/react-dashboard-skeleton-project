import React, { useMemo, useState } from "react";
import { Avatar } from "@chakra-ui/react";
import { Dropdown, DropdownItem, Spinner } from "components/ui";
import classNames from "classnames";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { dateLocales } from "locales";
import dayjs from "dayjs";
import i18n from "i18next";

import { HiCheck } from "react-icons/hi";
import { noop } from "../ui/utils/constant";
import { useLocaleStore } from "../../store";

const languageList = [
  { label: "English", value: "en", flag: "us" },
  { label: "Chinese", value: "zh-cn", flag: "cn" },
  { label: "Espanol", value: "es", flag: "sp" },
  { label: "Arabic", value: "ar", flag: "ar" },
];

export const LanguageSelector = ({ className }: { className: string }) => {
  const [loading, setLoading] = useState(false);
  const locale = useLocaleStore((state) => state.currentLang);
  const selectLangFlag = useMemo(() => {
    return languageList.find((lang) => lang.value === locale)?.flag;
  }, [locale]);

  const selectedLanguage = (
    <div className={classNames(className, "flex items-center")}>
      {loading ? (
        <Spinner size={20} />
      ) : (
        <Avatar size="xs" src={`/img/countries/${selectLangFlag}.png`} />
      )}
    </div>
  );

  const onLanguageSelect = (lang: string) => {
    const formattedLang = lang.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    setLoading(true);
    const dispatchLang = () => {
      i18n.changeLanguage(formattedLang).then(() => noop());
      setLoading(false);
    };

    dateLocales[formattedLang]()
      .then(() => {
        dayjs.locale(formattedLang);
        dispatchLang();
      })
      .catch(() => {
        dispatchLang();
      });
  };

  return (
    <Dropdown renderTitle={selectedLanguage} placement="bottom-end">
      {languageList.map((lang) => (
        <DropdownItem
          className="mb-1 justify-between"
          eventKey={lang.label}
          key={lang.label}
          onClick={() => onLanguageSelect(lang.value)}
        >
          <span className="flex items-center">
            <Avatar size="xs" src={`/img/countries/${lang.flag}.png`} />
            <span className="ltr:ml-2 rtl:mr-2">{lang.label}</span>
          </span>
          {locale === lang.value && (
            <HiCheck className="text-emerald-500 text-lg" />
          )}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default withHeaderItem(LanguageSelector);
