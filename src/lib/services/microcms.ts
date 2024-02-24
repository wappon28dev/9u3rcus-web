import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { EndPoints } from "@/types/cms-types";
import { getPublicFilePath } from "../constants";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export async function getContentList<T extends keyof EndPoints["gets"]>(
  key: T,
  queries: MicroCMSQueries = {}
): Promise<EndPoints["gets"][T]> {
  switch (key) {
    case "blogs":
      return await (
        await fetch(getPublicFilePath("/assets/mock/blogs-list.json"))
      ).json();
    case "works":
      return await (
        await fetch(getPublicFilePath("/assets/mock/works-list.json"))
      ).json();
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
  id: string,
  queries: MicroCMSQueries = {}
): Promise<EndPoints["get"][T]> {
  switch (key) {
    case "blogs":
      return await (
        await fetch(getPublicFilePath("/assets/mock/blogs-detail.json"))
      ).json();
    case "works":
      return await (
        await fetch(getPublicFilePath("/assets/mock/works-detail.json"))
      ).json();
    default:
      throw new Error("Invalid key");
  }

  // return await client.getListDetail<EndPoints["get"][T]>({
  //   endpoint: key,
  //   contentId: id,
  //   queries,
  // });
}
