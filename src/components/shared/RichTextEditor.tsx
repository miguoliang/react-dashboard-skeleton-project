import React, { forwardRef } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = forwardRef<ReactQuill, ReactQuillProps>((props, ref) => {
  return (
    <div className="rich-text-editor">
      <ReactQuill ref={ref} {...props} />
    </div>
  );
});

export default RichTextEditor;
