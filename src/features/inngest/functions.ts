// src/inngest/functions.ts
import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";

export const processTask = inngest.createFunction(
    { id: "process-task", triggers: { event: "app/task.created" } },
    async ({ event, step }) => {
        const result = await step.run("handle-task", async () => {
            return { processed: true, id: event.data.id };
        });

        await step.sleep("pause", "1s");

        return { message: `Task ${event.data.id} complete`, result };
    },
);


export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent", triggers: { event: "code-agent/run" } },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create({
        template: "ugwj9f6y2wocdpps7omf"
      });

      return sandbox.sandboxId;
    })

    

})
