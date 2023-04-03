import React, { useState } from "react";
import { Avatar, Upload } from "components/ui";
import { HiOutlinePlus } from "react-icons/hi";

const AvatarImage = () => {
  const [avatarImg, setAvatarImg] = useState<string>();

  const onFileUpload = (file: File[] | FileList) => {
    setAvatarImg(URL.createObjectURL(file[0]));
  };

  const beforeUpload = (files: File[] | FileList | null) => {
    let valid: string | boolean = true;

    const allowedFileType = ["image/jpeg", "image/png"];

    for (const file of files || []) {
      if (!allowedFileType.includes(file.type)) {
        valid = "Please upload a .jpeg or .png file!";
      }
    }

    return valid;
  };

  return (
    <div>
      <Upload
        className="cursor-pointer"
        onChange={onFileUpload}
        showList={false}
        uploadLimit={1}
        beforeUpload={beforeUpload}
      >
        <Avatar size={80} src={avatarImg} icon={<HiOutlinePlus />} />
      </Upload>
    </div>
  );
};

export default AvatarImage;
