import type { EndPoints } from "@client/lib/types/cms-types";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import blogsDetail from "~/assets/mock/blogs-detail.json";
import blogsList from "~/assets/mock/blogs-list.json";
import worksDetail from "~/assets/mock/works-detail.json";
import worksList from "~/assets/mock/works-list.json";

export const microcms = createClient({
  serviceDomain: import.meta.env.CLIENT_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.CLIENT_MICROCMS_API_KEY,
});

export async function getContentList<T extends keyof EndPoints["gets"]>(
  key: T,
  queries: MicroCMSQueries = {},
): Promise<EndPoints["gets"][T]> {
  if (process.env.NODE_ENV === "development") {
    switch (key) {
      case "blogs":
        return blogsList as any;
      case "works":
        return worksList as any;
      default:
        throw new Error("Invalid key");
    }
  }

  return await microcms.get({
    endpoint: key,
    queries,
  });
}

export async function getContentDetail<T extends keyof EndPoints["get"]>(
  key: T,
  id: string,
  queries: MicroCMSQueries = {},
): Promise<EndPoints["get"][T]> {
  if (process.env.NODE_ENV === "development") {
    switch (key) {
      case "blogs":
        return blogsDetail as any;
      case "works":
        return worksDetail as any;
      default:
        throw new Error("Invalid key");
    }
  }
  return await microcms.getListDetail<EndPoints["get"][T]>({
    endpoint: key,
    contentId: id,
    queries,
  });
}
