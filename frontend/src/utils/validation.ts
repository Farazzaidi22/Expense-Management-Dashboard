// frontend/src/utils/validation.ts
import { VALIDATION_RULES } from "./constants";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateUser = (name: string, email: string): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate name
  if (!name.trim()) {
    errors.name = "Name is required";
  } else if (name.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    errors.name = `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`;
  } else if (name.trim().length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    errors.name = `Name must be no more than ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`;
  }

  // Validate email
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!VALIDATION_RULES.EMAIL.PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateTransaction = (
  amount: number,
  category: string,
  description: string,
  date: string
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate amount
  if (!amount || amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  } else if (amount < VALIDATION_RULES.AMOUNT.MIN) {
    errors.amount = `Amount must be at least $${VALIDATION_RULES.AMOUNT.MIN}`;
  } else if (amount > VALIDATION_RULES.AMOUNT.MAX) {
    errors.amount = `Amount must be no more than $${VALIDATION_RULES.AMOUNT.MAX}`;
  }

  // Validate category
  if (!category.trim()) {
    errors.category = "Category is required";
  }

  // Validate description
  if (description.length > VALIDATION_RULES.DESCRIPTION.MAX_LENGTH) {
    errors.description = `Description must be no more than ${VALIDATION_RULES.DESCRIPTION.MAX_LENGTH} characters`;
  }

  // Validate date
  if (!date) {
    errors.date = "Date is required";
  } else {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today

    if (selectedDate > today) {
      errors.date = "Date cannot be in the future";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
