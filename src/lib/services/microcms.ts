// SDK利用準備
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { EndPoints, works } from "@/types/cms-types";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export async function getWorksList(
  queries: MicroCMSQueries = {}
): Promise<EndPoints["gets"]["works"]> {
  return await client.get({
    endpoint: "works",
    queries,
  });
}

export async function getWorksDetail(
  id: string,
  queries: MicroCMSQueries = {}
): Promise<EndPoints["get"]["works"]> {
  return await client.getListDetail<works>({
    endpoint: "works",
    contentId: id,
    queries,
  });
}
