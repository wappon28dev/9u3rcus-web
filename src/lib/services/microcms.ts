// SDK利用準備
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
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
  const mock = import.meta.env.MICROCMS_MOCK_WORKS_LIST;
  if (mock == null) {
    throw new Error("MICROCMS_MOCK_WORKS_LIST is not defined");
  }
  return JSON.parse(mock);
})();

export const worksDetailsMock: EndPoints["get"]["works"] = (() => {
  const mock = import.meta.env.MICROCMS_MOCK_WORKS_DETAILS;
  if (mock == null) {
    throw new Error("MICROCMS_MOCK_WORKS_DETAILS is not defined");
  }
  return JSON.parse(mock);
})();

export const blogsListMock: EndPoints["gets"]["blogs"] = (() => {
  const mock = import.meta.env.MICROCMS_MOCK_BLOGS_LIST;
  if (mock == null) {
    throw new Error("MICROCMS_MOCK_BLOGS_LIST is not defined");
  }
  return JSON.parse(mock);
})();

export const blogsDetailsMock: EndPoints["get"]["blogs"] = (() => {
  const mock = import.meta.env.MICROCMS_MOCK_BLOGS_DETAILS;
  if (mock == null) {
    throw new Error("MICROCMS_MOCK_BLOGS_DETAILS is not defined");
  }
  return JSON.parse(mock);
})();
