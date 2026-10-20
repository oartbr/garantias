import { describe, expect, it } from "vitest";
import { WorkflowService } from "@/services/workflows/workflowService";
import workflows from "@/services/workflows/workflowGarantia";
import dedupe from "@/services/helpers/remove-duplicates-from-array-of-objects";

describe("Warranty workflows", () => {
  for (const [status, roles] of Object.entries(workflows)) {
    for (const [role, expected] of Object.entries(roles)) {
      it(`${status} / ${role} preserves the action and destination`, () => {
        const result = new WorkflowService(
          { status, garantiaId: "TEST123" },
          role === "default" ? null : { role: { name: role } },
          workflows
        ).getWorkflowData();
        expect(result).toEqual({
          ...expected,
          route: expected.route.replace("{garantiaId}", "TEST123"),
          message: expected.message.replace("{garantiaId}", "TEST123"),
        });
      });
    }
  }
  it("unknown warranty has a safe error destination", () => {
    expect(
      new WorkflowService(null, null, workflows).getWorkflowData()
    ).toMatchObject({ route: "/error", action: "Close" });
  });
  it("pagination deduplication keeps the first item and does not mutate input", () => {
    const data = [
      { id: 1, value: "a" },
      { id: 1, value: "b" },
      { id: 2, value: "c" },
    ];
    expect(dedupe(data, "id")).toEqual([data[0], data[2]]);
    expect(data).toHaveLength(3);
  });
});
