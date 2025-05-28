// frontend/src/__tests__/utils/validation.test.ts
import { describe, it, expect } from "vitest";
import { validateUser, validateTransaction } from "../../utils/validation";

describe("Validation Utils", () => {
  describe("validateUser", () => {
    it("validates correct user data", () => {
      const result = validateUser("John Doe", "john@example.com");
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it("validates empty name", () => {
      const result = validateUser("", "john@example.com");
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Name is required");
    });

    it("validates invalid email", () => {
      const result = validateUser("John Doe", "invalid-email");
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe("Please enter a valid email address");
    });

    it("validates name length", () => {
      const result = validateUser("J", "john@example.com");
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toContain("at least");
    });
  });

  describe("validateTransaction", () => {
    it("validates correct transaction data", () => {
      const result = validateTransaction(100, "food", "Lunch", "2025-01-01");
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it("validates negative amount", () => {
      const result = validateTransaction(-10, "food", "Lunch", "2025-01-01");
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toContain("greater than 0");
    });

    it("validates empty category", () => {
      const result = validateTransaction(100, "", "Lunch", "2025-01-01");
      expect(result.isValid).toBe(false);
      expect(result.errors.category).toBe("Category is required");
    });

    it("validates future date", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const result = validateTransaction(
        100,
        "food",
        "Lunch",
        futureDate.toISOString().split("T")[0]
      );
      expect(result.isValid).toBe(false);
      expect(result.errors.date).toContain("cannot be in the future");
    });
  });
});
