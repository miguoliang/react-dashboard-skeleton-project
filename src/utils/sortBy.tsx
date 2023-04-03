import { FunctionType } from "constants/types";

const sortBy = (field: string, reverse: boolean, primer?: FunctionType) => {
  const key = primer
    ? function (x: any) {
        return primer(x[field]);
      }
    : function (x: any) {
        return x[field];
      };
  const reverseInt = !reverse ? 1 : -1;
  return function (a: any, b: any) {
    return (a = key(a)), (b = key(b)), reverseInt * (+(a > b) - +(b > a));
  };
};

export default sortBy;
