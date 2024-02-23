import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import blogsDetail from "@public/assets/mock/blogs-detail.json";
import blogsList from "@public/assets/mock/blogs-list.json";
import worksDetail from "@public/assets/mock/works-detail.json";
import worksList from "@public/assets/mock/works-list.json";
import type { EndPoints } from "@/types/cms-types";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export async function getContentList<T extends keyof EndPoints["gets"]>(
  key: T,
  queries: MicroCMSQueries = {}
): Promise<EndPoints["gets"][T]> {
  return await client.get({
    endpoint: key,
    queries,
  });
}

export async function getContentDetail<T extends keyof EndPoints["get"]>(
  key: T,
  id: string,
  queries: MicroCMSQueries = {}
): Promise<EndPoints["get"][T]> {
  return await client.getListDetail<EndPoints["get"][T]>({
    endpoint: key,
    contentId: id,
    queries,
  });
}

export const worksListMock: EndPoints["gets"]["works"] = (() => {
  if (worksList == null) {
    throw new Error("worksList is not defined");
  }
  return worksList as any;
})();

export const worksDetailsMock: EndPoints["get"]["works"] = (() => {
  if (worksDetail == null) {
    throw new Error("worksDetail is not defined");
  }
  return worksDetail as any;
})();

export const blogsListMock: EndPoints["gets"]["blogs"] = (() => {
  if (blogsList == null) {
    throw new Error("blogsList is not defined");
  }
  return blogsList as any;
})();

export const blogsDetailsMock: EndPoints["get"]["blogs"] = (() => {
  if (blogsDetail == null) {
    throw new Error("blogsDetail is not defined");
  }
  return blogsDetail as any;
})();
