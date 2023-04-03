import React from "react";
import {
  Draggable,
  DraggableChildrenFn,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import BoardCard from "./BoardCard";
import { Card } from "mock/data/projectData";

function InnerList(props: {
  dropProvided: DroppableProvided;
  contents: Card[];
}) {
  const { dropProvided, contents, ...rest } = props;
  return (
    <div className="board-dropzone h-full" ref={dropProvided.innerRef}>
      <div className="px-4 h-full">
        {contents.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(dragProvided) => (
              <BoardCard
                data={item}
                ref={dragProvided.innerRef}
                {...dragProvided.draggableProps}
                {...dragProvided.dragHandleProps}
                {...rest}
              />
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
}

const BoardCardList = (props: {
  listId: string;
  listType: string;
  className?: string;
  contents: Card[];
  internalScroll?: boolean;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  useClone?: DraggableChildrenFn;
  cardData?: Card;
  style?: React.CSSProperties;
  scrollContainerStyle?: React.CSSProperties;
  ignoreContainerClipping?: boolean;
}) => {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = "LIST",
    style,
    listType,
    contents,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={useClone}
    >
      {(dropProvided) => (
        <div
          style={style}
          className="board-wrapper overflow-hidden flex-auto"
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <div className="board-scrollContainer" style={scrollContainerStyle}>
              <InnerList contents={contents} dropProvided={dropProvided} />
            </div>
          ) : (
            <InnerList contents={contents} dropProvided={dropProvided} />
          )}
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default BoardCardList;
