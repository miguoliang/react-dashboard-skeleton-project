import React from "react";

const FormDescription = ({
  title,
  desc,
  ...rest
}: {
  title: string;
  desc: string;
} & JSX.IntrinsicElements["div"]) => {
  return (
    <div {...rest}>
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  );
};

export default FormDescription;
