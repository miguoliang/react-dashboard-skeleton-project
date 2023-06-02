import ApiService from "./ApiService";
import { DataSource } from "../models/data-source";
import { PaginationRequest, PaginationResponse } from "../models/pagination";
import { Vertex } from "../models/vertex";
import { Category, Graph, Link, Node } from "../models/echarts";
import { Edge } from "../models/edge";
import dayjs from "dayjs";

export async function apiGetDataSources(
  date?: Date,
  pageable?: PaginationRequest,
) {
  return ApiService.fetchData<PaginationResponse<DataSource>>({
    url: "/data-sources",
    method: "get",
    params: {
      date: dayjs(date).format("YYYY-MM-DD"),
      ...pageable,
    },
  });
}

export async function apiGetDataSourceVertices(dataSourceId: string) {
  return ApiService.fetchData<Vertex[]>({
    url: `/data-sources/${dataSourceId}/vertices`,
    method: "get",
  });
}

export function makeGraph(vertices: Vertex[], edges: Edge[]) {
  const nodes: Node[] = [];
  const categories: Category[] = [];
  vertices.forEach((vertex, index) => {
    nodes.push({
      id: vertex.id,
      name: vertex.name,
      category: index,
    });
    categories.push({ name: vertex.name });
  });
  const links: Link[] = edges.map((edge) => ({
    source: edge.inVertexId,
    target: edge.outVertexId,
  }));
  return { nodes, links, categories } as Graph;
}
