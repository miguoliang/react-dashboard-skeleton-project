import React from "react";
import { APP_NAME } from "constants/app.constant";
import { Flex } from "@chakra-ui/react";

const FooterContent = () => {
  return (
    <div className="flex items-center justify-between flex-auto w-full">
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`}{" "}
        <span className="font-semibold">{`${APP_NAME}`}</span> All rights
        reserved.
      </span>
      <div className="">
        <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
          Term & Conditions
        </a>
        <span className="mx-2 text-muted"> | </span>
        <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
          Privacy & Policy
        </a>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <Flex as="footer">
      <FooterContent />
    </Flex>
  );
}
