import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import blogsList from "@public/assets/mock/blogs-list.json";
import worksList from "@public/assets/mock/works-list.json";
import blogsDetail from "@public/assets/mock/blogs-detail.json";
import worksDetail from "@public/assets/mock/works-detail.json";
import type { EndPoints } from "@/types/cms-types";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export async function getContentList<T extends keyof EndPoints["gets"]>(
  key: T,
  _queries: MicroCMSQueries = {}
): Promise<EndPoints["gets"][T]> {
  switch (key) {
    case "blogs":
      return blogsList as any;
    case "works":
      return worksList as any;
    default:
      throw new Error("Invalid key");
  }

  // return await client.get({
  //   endpoint: key,
  //   queries,
  // });
}

export async function getContentDetail<T extends keyof EndPoints["get"]>(
  key: T,
  _id: string,
  _queries: MicroCMSQueries = {}
): Promise<EndPoints["get"][T]> {
  switch (key) {
    case "blogs":
      return blogsDetail as any;
    case "works":
      return worksDetail as any;
    default:
      throw new Error("Invalid key");
  }

  // return await client.getListDetail<EndPoints["get"][T]>({
  //   endpoint: key,
  //   contentId: id,
  //   queries,
  // });
}
