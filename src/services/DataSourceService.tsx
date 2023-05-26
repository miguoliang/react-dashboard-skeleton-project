import ApiService from "./ApiService";
import { DataSource } from "../models/data-source";
import { PaginationRequest, PaginationResponse } from "../models/pagination";
import { Vertex } from "../models/vertex";
import { Graph } from "../models/echarts";

export async function apiGetDataSources(pageable?: PaginationRequest) {
  return ApiService.fetchData<PaginationResponse<DataSource>>({
    url: "/data-sources",
    method: "get",
    params: pageable,
  });
}

export async function apiGetDataSourceVertices(dataSourceId: string) {
  return ApiService.fetchData<Vertex[]>({
    url: `/data-sources/${dataSourceId}/vertices`,
    method: "get",
  });
}

export function makeGraph(vertices: Vertex[]) {
  const nodes = vertices.map((vertex, index) => {
    return {
      id: vertex.id,
      name: vertex.name,
      category: index,
    };
  });
  const categories = nodes.map((node) => {
    return {
      name: node.name,
    };
  });
  return { nodes, categories } as Graph;
}
