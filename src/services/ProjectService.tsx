import ApiService from "./ApiService";
import {
  Column,
  Issue,
  Member,
  Project,
  ProjectDashboard,
} from "../mock/data/projectData";

export async function apiGetProjectDashboardData(params: any) {
  return ApiService.fetchData<ProjectDashboard>({
    url: "/project/dashboard",
    method: "get",
    params,
  });
}

export async function apiGetProjectList(data: any) {
  return ApiService.fetchData<Project[]>({
    url: "/project/list",
    method: "post",
    data,
  });
}

export async function apiPutProjectList(data: any) {
  return ApiService.fetchData<Project[]>({
    url: "/project/list/add",
    method: "put",
    data,
  });
}

export async function apiGetScrumBoards() {
  return ApiService.fetchData<Column[]>({
    url: "/project/scrum-board/boards",
    method: "post",
  });
}

export async function apiGetScrumBoardMembers() {
  return ApiService.fetchData<{
    participantMembers: Member[];
    allMembers: Member[];
  }>({
    url: "/project/scrum-board/members",
    method: "post",
  });
}

export async function apiGetScrumBoardTicketDetail(params: any) {
  return ApiService.fetchData<Issue>({
    url: "/project/scrum-board/tickets/detail",
    method: "get",
    params,
  });
}
