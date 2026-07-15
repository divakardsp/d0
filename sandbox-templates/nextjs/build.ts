import { Template, defaultBuildLogger } from "e2b";
import { template as nextJSTemplate } from "./template";
import dotenv from "dotenv";
dotenv.config();

Template.build(nextJSTemplate, "d0-build", {
    cpuCount: 4,
    memoryMB: 4096,
    onBuildLogs: defaultBuildLogger(),
    apiKey: "e2b_f6d68691d6efea2aecf4bcc9668852aab0f9d610",
});
