// frontend/src/__tests__/mocks/server.ts
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const baseURL = "http://localhost:8000/api";

export const handlers = [
  // Users endpoints
  http.get(`${baseURL}/users`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          totalIncome: 5000,
          totalExpense: 2000,
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01",
        },
      ],
    });
  }),

  http.post(`${baseURL}/users`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        totalIncome: 0,
        totalExpense: 0,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
    });
  }),

  // Transactions endpoints
  http.get(`${baseURL}/users/:userId/transactions`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: 1,
          userId: 1,
          type: "income",
          amount: 1000,
          category: "income",
          description: "Salary",
          date: "2025-01-01",
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01",
        },
      ],
    });
  }),

  // Analytics endpoints
  http.get(`${baseURL}/analytics/expenses-by-category`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          category: "food",
          amount: 500,
          percentage: 50,
          color: "#FF6B6B",
        },
      ],
    });
  }),
];

export const server = setupServer(...handlers);
