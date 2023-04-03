import React, { PropsWithChildren } from "react";
import { VscFile, VscFilePdf, VscFileZip } from "react-icons/vsc";

const BYTE = 1000;
const getKB = (bytes: number) => Math.round(bytes / BYTE);

const FileIcon = ({ children }: PropsWithChildren<{}>) => {
  return <span className="text-4xl">{children}</span>;
};

type FileItemProps = PropsWithChildren<{
  file: Blob | MediaSource;
}>;

const FileItem = (props: FileItemProps) => {
  const { file, children } = props;
  const { type, name, size } = file as File;

  const renderThumbnail = () => {
    const isImageFile = type.split("/")[0] === "image";

    if (isImageFile) {
      return (
        <img
          className="upload-file-image"
          src={URL.createObjectURL(file)}
          alt={`file preview ${name}`}
        />
      );
    }

    if (type === "application/zip") {
      return (
        <FileIcon>
          <VscFileZip />
        </FileIcon>
      );
    }

    if (type === "application/pdf") {
      return (
        <FileIcon>
          <VscFilePdf />
        </FileIcon>
      );
    }

    return (
      <FileIcon>
        <VscFile />
      </FileIcon>
    );
  };

  return (
    <div className="upload-file">
      <div className="flex">
        <div className="upload-file-thumbnail">{renderThumbnail()}</div>
        <div className="upload-file-info">
          <h6 className="upload-file-name">{name}</h6>
          <span className="upload-file-size">{getKB(size)} kb</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default FileItem;
