import { DataSource } from "./data-source";

export interface Vertex {
  id: string;
  name: string;
  type: string;
  status: string;
  dataSources?: DataSource[];
}
