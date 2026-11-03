import { defineCliConfig } from "sanity/cli";
import settings from "./sanity.settings.json";

export default defineCliConfig({
  api: {
    projectId: settings.projectId || "placeholder",
    dataset: settings.dataset,
  },
});
