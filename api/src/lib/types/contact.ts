import { z } from "zod";

export const zContactManifest = z.object({
  allowedHosts: z.array(z.string()),
  accessKey: z.string(),
});

export type ContactManifest = z.infer<typeof zContactManifest>;
