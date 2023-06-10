import React, { useMemo } from "react";
import {
  Avatar,
  Circle,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBoolean,
} from "@chakra-ui/react";
import { Spinner } from "components/ui";
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

export const LanguageSelector = () => {
  const [loading, setLoading] = useBoolean();
  const locale = useLocaleStore((state) => state.currentLang);
  const selectLangFlag = useMemo(() => {
    return languageList.find((lang) => lang.value === locale)?.flag;
  }, [locale]);

  const selectedLanguage = loading ? (
    <Spinner size={20} />
  ) : (
    <Image boxSize="24px" src={`/img/countries/${selectLangFlag}.png`} />
  );

  const onLanguageSelect = (lang: string) => {
    const formattedLang = lang.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    setLoading.on();
    const dispatchLang = () => {
      i18n.changeLanguage(formattedLang).then(() => noop());
      setLoading.off();
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
    <Menu placement="bottom-end">
      <MenuButton>
        <Circle size="40px" p={1} _hover={{ bg: "gray.100" }}>
          {selectedLanguage}
        </Circle>
      </MenuButton>
      <MenuList>
        {languageList.map((lang) => (
          <MenuItem
            key={lang.value}
            onClick={() => onLanguageSelect(lang.value)}
          >
            <Image
              width="18px"
              height="18px"
              src={`/img/countries/${lang.flag}.png`}
              alt={lang.label}
            />
            <span className="ltr:ml-2 rtl:mr-2 flex-grow">{lang.label}</span>
            {locale === lang.value && (
              <HiCheck className="text-emerald-500 text-lg" />
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default withHeaderItem(LanguageSelector);
