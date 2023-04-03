import ApiService from "./ApiService";
import {
  HelpCenterArticle,
  HelpCenterCategory,
} from "../mock/data/knowledgeBaseData";

export async function apiGetCategoriesData() {
  return ApiService.fetchData<HelpCenterCategory[]>({
    url: "/knowledge-base/categories",
    method: "get",
  });
}

export async function apiQueryArticleList(data: any) {
  return ApiService.fetchData<HelpCenterArticle[]>({
    url: "/knowledge-base/articles-query",
    method: "post",
    data,
  });
}

export async function apiGetArticle(params: any) {
  return ApiService.fetchData<HelpCenterArticle>({
    url: "/knowledge-base/article",
    method: "get",
    params,
  });
}

export async function apiPostArticle(data: any) {
  return ApiService.fetchData<HelpCenterArticle>({
    url: "/knowledge-base/article",
    method: "post",
    data,
  });
}

export async function apiGetOthersArticleList(params: any) {
  return ApiService.fetchData<{
    relatedArticle: HelpCenterArticle[];
    popularArticle: HelpCenterArticle[];
  }>({
    url: "/knowledge-base/others-article",
    method: "get",
    params,
  });
}

export async function apiGetCategorizedArticles(params: any) {
  return ApiService.fetchData<HelpCenterCategory[]>({
    url: "/knowledge-base/categorized-articles",
    method: "get",
    params,
  });
}
