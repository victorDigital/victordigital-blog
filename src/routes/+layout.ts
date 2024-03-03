import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
import type { Config } from "@sveltejs/adapter-vercel";

export const config: Config = {
  runtime: "edge",
};

injectSpeedInsights();
