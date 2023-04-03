import React from "react";
import { Draggable, DraggableChildrenFn } from "react-beautiful-dnd";
import BoardTitle from "./BoardTitle";
import BoardCardList from "./BoardCardList";
import { Card } from "../../../mock/data/projectData";

const BoardColumn = (props: {
  title: string;
  contents: Card[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: DraggableChildrenFn;
}) => {
  const { title, contents, index, isScrollable, isCombineEnabled, useClone } =
    props;

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div
          className="
							board-column 
							flex 
							flex-col
							mb-3
							min-w-[300px] 
							w-[300px] 
							max-w-[300px] 
							p-0
							rounded-lg
						"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <BoardTitle
            title={title}
            dragHandleProps={provided.dragHandleProps}
          />
          <BoardCardList
            listId={title}
            listType="CONTENT"
            className={snapshot.isDragging ? "is-dragging" : ""}
            contents={contents}
            internalScroll={isScrollable}
            isCombineEnabled={isCombineEnabled}
            useClone={useClone}
          />
        </div>
      )}
    </Draggable>
  );
};

export default BoardColumn;
