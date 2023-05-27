import ApiService from "./ApiService";
import { Edge } from "../models/edge";

export async function apiGetEdgesByVertices(vertexIds: string[]) {
  return ApiService.fetchData<Edge[]>({
    url: "/edges-by-vertices",
    method: "post",
    data: vertexIds,
  });
}
