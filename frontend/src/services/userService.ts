// frontend/src/services/userService.ts
import { User, CreateUserRequest, UpdateUserRequest } from "../types";
import { apiClient } from "./api";

// Interface for the raw API response (snake_case)
interface ApiUser {
  id: number;
  name: string;
  email: string;
  total_income: string;
  total_expense: string;
  created_at: string;
  updated_at: string;
}

// Transform function to convert API response to frontend format
const transformUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  name: apiUser.name,
  email: apiUser.email,
  totalIncome: parseFloat(apiUser.total_income || "0"),
  totalExpense: parseFloat(apiUser.total_expense || "0"),
  createdAt: apiUser.created_at,
  updatedAt: apiUser.updated_at,
});

class UserService {
  async getUsers() {
    const response = await apiClient.get<ApiUser[]>("/users");

    // Transform the array of API users to frontend format
    const transformedUsers = response.data.map(transformUser);

    return {
      ...response,
      data: transformedUsers,
    };
  }

  async getUserById(id: number) {
    const response = await apiClient.get<ApiUser>(`/users/${id}`);

    // Transform the single user to frontend format
    const transformedUser = transformUser(response.data);

    return {
      ...response,
      data: transformedUser,
    };
  }

  async createUser(userData: CreateUserRequest) {
    const response = await apiClient.post<ApiUser>("/users", userData);

    // Transform the created user to frontend format
    const transformedUser = transformUser(response.data);

    return {
      ...response,
      data: transformedUser,
    };
  }

  async updateUser(id: number, userData: UpdateUserRequest) {
    const response = await apiClient.put<ApiUser>(`/users/${id}`, userData);

    // Transform the updated user to frontend format
    const transformedUser = transformUser(response.data);

    return {
      ...response,
      data: transformedUser,
    };
  }

  async deleteUser(id: number) {
    return apiClient.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
