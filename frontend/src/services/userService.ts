// frontend/src/services/userService.ts
import { transformUser, transformUsers } from "@/utils/transforms";
import { CreateUserRequest, UpdateUserRequest } from "../types";
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

class UserService {
  async getUsers() {
    const response = await apiClient.get<ApiUser[]>("/users");

    // Transform the array of API users to frontend format
    const transformedUsers = transformUsers(response.data);

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
