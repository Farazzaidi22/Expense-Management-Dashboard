// frontend/src/utils/constants.ts
export const API_ENDPOINTS = {
  USERS: "/users",
  TRANSACTIONS: "/transactions",
  ANALYTICS: "/analytics",
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  food: "#FF6B6B",
  transportation: "#4ECDC4",
  housing: "#45B7D1",
  utilities: "#96CEB4",
  healthcare: "#FFEAA7",
  entertainment: "#DDA0DD",
  shopping: "#98D8C8",
  education: "#F7DC6F",
  travel: "#BB8FCE",
  other: "#AED6F1",
  income: "#2ECC71",
};

export const TRANSACTION_TYPES = {
  INCOME: "income" as const,
  EXPENSE: "expense" as const,
};

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  AMOUNT: {
    MIN: 0.01,
    MAX: 999999.99,
  },
  DESCRIPTION: {
    MAX_LENGTH: 500,
  },
} as const;
