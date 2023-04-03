import React, { useMemo } from "react";
import { Card } from "components/ui";
import { DoubleSidedImage } from "components/shared";
import { queryArticles, setSearch } from "../store/dataSlice";
import { useAppDispatch } from "store/hooks";
import { HelpCenterCategory } from "../../../../mock/data/knowledgeBaseData";

const CategoryIcon = ({ type }: { type: string }) => {
  const iconTypeProps = useMemo(() => {
    return {
      src: `/img/thumbs/help-center-category-${type}.png`,
      darkModeSrc: `/img/thumbs/help-center-category-${type}-dark.png`,
    };
  }, [type]);

  return <DoubleSidedImage {...iconTypeProps} alt="" />;
};

const Categories = (props: { data: HelpCenterCategory[] }) => {
  const { data } = props;

  const dispatch = useAppDispatch();

  const onCategoryClick = (name: string) => {
    dispatch(queryArticles({ queryText: "", category: name.toLowerCase() }));
    dispatch(setSearch(true));
  };

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      {data.map((cat) => (
        <Card
          clickable
          key={cat.value}
          onClick={() => onCategoryClick(cat.label)}
        >
          <div className="mb-4 flex justify-center">
            <CategoryIcon type={cat.value} />
          </div>
          <div className="text-center">
            <h5 className="mb-1">{cat.label}</h5>
            <strong>{cat.articleCounts} </strong>
            <span>Articles</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Categories;
