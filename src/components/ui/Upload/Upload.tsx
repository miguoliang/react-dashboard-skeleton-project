import React, {
  ChangeEventHandler,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import cloneDeep from "lodash/cloneDeep";
import FileItem from "./FileItem";
import { FieldProps } from "formik";
import { Button, CloseButton, useBoolean, useToast } from "@chakra-ui/react";

const filesToArray = (files: Record<string, any>) =>
  Object.keys(files).map((key) => files[key]);

const Upload = React.forwardRef<
  HTMLDivElement,
  {
    uploadLimit?: number;
    draggable?: boolean;
    disabled?: boolean;
    showList?: boolean;
    multiple?: boolean;
    accept?: string;
    tip?: ReactNode;
    fileList?: File[];
    beforeUpload?: (file: File[] | FileList) => string | boolean;
    className?: string;
    onChange?: (file: File[] | FileList) => void;
    onFileRemove?: (file: File[] | FileList) => void;
    children?: ReactNode;
  } & Partial<FieldProps>
>((props, ref) => {
  const {
    accept,
    beforeUpload,
    disabled = false,
    draggable,
    fileList,
    multiple,
    onChange,
    onFileRemove,
    showList,
    tip,
    uploadLimit,
    children,
    className,
  } = props;

  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>(fileList ?? []);
  const [dragOver, setDragOver] = useBoolean();

  const { themeColor, primaryColorLevel } = useConfig();

  useEffect(() => {
    setFiles(fileList ?? []);
  }, [fileList]);

  const toast = useToast();

  const triggerMessage = (msg?: string) => {
    toast({
      description: msg || "Upload Failed!",
      duration: 2000,
      status: "error",
      position: "top",
      isClosable: true,
    });
  };

  const pushFile = (newFiles: FileList | File[] | null, file: File[]) => {
    for (const f of newFiles || []) {
      file.push(f);
    }
    return file;
  };

  const addNewFiles = (newFiles: File[] | FileList | null) => {
    let file = cloneDeep(files);
    if (typeof uploadLimit === "number" && uploadLimit !== 0) {
      if (Object.keys(file).length >= uploadLimit) {
        if (uploadLimit === 1) {
          file.shift();
          file = pushFile(newFiles, file);
        }

        return filesToArray({ ...file });
      }
    }
    file = pushFile(newFiles, file);
    return filesToArray({ ...file });
  };

  const onNewFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files: newFiles } = e.target;
    let result: string | boolean = true;

    if (beforeUpload) {
      result = beforeUpload(newFiles ?? []);

      if (result === false) {
        triggerMessage("");
        return;
      }

      if (typeof result === "string" && result.length > 0) {
        triggerMessage(result);
        return;
      }
    }

    if (result) {
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      onChange?.(updatedFiles);
    }
  };

  const removeFile = (fileIndex: number) => {
    const deletedFileList = files.filter((_, index) => index !== fileIndex);
    setFiles(deletedFileList);
    onFileRemove?.(deletedFileList);
  };

  const triggerUpload = (e: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      fileInputField.current?.click();
    }
    e.stopPropagation();
  };

  const renderChildren = () => {
    if (!draggable && !children) {
      return (
        <Button disabled={disabled} onClick={(e) => e.preventDefault()}>
          Upload
        </Button>
      );
    }

    if (draggable && !children) {
      return <span>Choose a file or drag and drop here</span>;
    }

    return children;
  };

  const handleDragLeave = useCallback(() => {
    if (draggable) {
      setDragOver.off();
    }
  }, [draggable]);

  const handleDragOver = useCallback(() => {
    if (draggable && !disabled) {
      setDragOver.on();
    }
  }, [draggable, disabled]);

  const handleDrop = useCallback(() => {
    if (draggable) {
      setDragOver.off();
    }
  }, [draggable]);

  const draggableProp = {
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  };

  const draggableEventFeedbackClass = `border-${themeColor}-${primaryColorLevel}`;

  const uploadClass = classNames(
    "upload",
    draggable && `upload-draggable`,
    draggable && !disabled && `hover:${draggableEventFeedbackClass}`,
    draggable && disabled && "disabled",
    dragOver && draggableEventFeedbackClass,
    className,
  );

  const uploadInputClass = classNames("upload-input", draggable && `draggable`);
  return (
    <>
      <div
        ref={ref}
        className={uploadClass}
        {...(draggable ? draggableProp : { onClick: triggerUpload })}
      >
        <input
          className={uploadInputClass}
          type="file"
          ref={fileInputField}
          onChange={onNewFileUpload}
          disabled={disabled}
          multiple={multiple}
          accept={accept}
        ></input>
        {renderChildren()}
      </div>
      {tip}
      {showList && (
        <div className="upload-file-list">
          {files.map((file, index) => (
            <FileItem file={file} key={file.name + index}>
              <CloseButton
                onClick={() => removeFile(index)}
                className="upload-file-remove"
              />
            </FileItem>
          ))}
        </div>
      )}
    </>
  );
});

export default Upload;
