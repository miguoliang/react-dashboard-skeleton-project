export type Graph = {
  nodes?: Node[];
  links?: Link[];
  categories?: Category[];
};

type Category = {
  name: string;
};

type Link = {
  source: string;
  target: string;
};

type Node = {
  id: string;
  name: string;
  symbolSize?: number;
  x?: number;
  y?: number;
  value?: number;
  category?: number;
};
