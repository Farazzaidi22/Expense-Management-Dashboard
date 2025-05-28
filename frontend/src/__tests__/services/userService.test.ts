// frontend/src/__tests__/services/userService.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { userService } from "../../services/userService";
import { server } from "../mocks/server";

describe("UserService", () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it("fetches users successfully", async () => {
    const response = await userService.getUsers();
    expect(response.success).toBe(true);
    expect(response.data).toHaveLength(1);
    expect(response.data[0].name).toBe("John Doe");
  });

  it("creates user successfully", async () => {
    const userData = { name: "Jane Doe", email: "jane@example.com" };
    const response = await userService.createUser(userData);
    expect(response.success).toBe(true);
    expect(response.data.name).toBe("Jane Doe");
  });
});
