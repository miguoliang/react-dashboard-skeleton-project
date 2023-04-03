import React, { useRef } from "react";
import { Container } from "components/shared";
import {
  queryArticles,
  setQueryText,
  setSearch,
  setSearchCategory,
} from "../store/dataSlice";
import {
  Button,
  Input,
  InputGroup,
  Notification,
  Select,
  toast,
} from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { HelpCenterCategory } from "../../../../mock/data/knowledgeBaseData";
import { SelectChangeHandler } from "../../../../components/ui/Select/Select";

const categoryOptions: HelpCenterCategory[] = [
  { label: "All", value: "" },
  { label: "Survey", value: "survey" },
  { label: "Themes", value: "themes" },
  { label: "Security", value: "security" },
  { label: "Integration", value: "integration" },
  { label: "Media", value: "media" },
  { label: "Analytic", value: "analytic" },
  { label: "ChatBot", value: "chatBot" },
  { label: "Commission", value: "commission" },
];

const TopSection = () => {
  const dispatch = useAppDispatch();

  const searchCategory = useAppSelector(
    (state) => state.knowledgeBaseHelpCenter.data.searchCategory
  );

  const searchInput = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    const text = searchInput.current?.value;
    if (text) {
      dispatch(queryArticles({ queryText: text, category: searchCategory }));
      dispatch(setQueryText(text));
      dispatch(setSearch(true));
    } else {
      toast.push(
        <Notification title="Please key in any text to search" type="danger" />,
        {
          placement: "top-center",
        }
      );
    }
  };

  const onCategoryChange: SelectChangeHandler<HelpCenterCategory> = (
    selected
  ) => {
    dispatch(setSearchCategory(selected?.value));
  };

  return (
    <section className="flex flex-col justify-center h-[200px] bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
      <Container className="flex flex-col items-center px-4">
        <h3 className="mb-6 text-center">
          Get your question answered quickly here!
        </h3>
        <InputGroup className="mb-4 xl:min-w-[800px]">
          <Input ref={searchInput} placeholder="Search..." />
          <div className="min-w-[120px]">
            <Select<HelpCenterCategory>
              isSearchable={false}
              placeholder="Category"
              options={categoryOptions}
              onChange={onCategoryChange}
              value={categoryOptions.filter(
                (option) => option.value === searchCategory
              )}
            />
          </div>
          <Button
            onClick={onSearch}
            icon={
              <span className="mx-4">
                <HiOutlineSearch />
              </span>
            }
          />
        </InputGroup>
      </Container>
    </section>
  );
};

export default TopSection;
