// frontend/src/services/userService.ts
import { User, CreateUserRequest, UpdateUserRequest } from "../types";
import { apiClient } from "./api";

class UserService {
  async getUsers() {
    return apiClient.get<User[]>("/users");
  }

  async getUserById(id: number) {
    return apiClient.get<User>(`/users/${id}`);
  }

  async createUser(userData: CreateUserRequest) {
    return apiClient.post<User>("/users", userData);
  }

  async updateUser(id: number, userData: UpdateUserRequest) {
    return apiClient.put<User>(`/users/${id}`, userData);
  }

  async deleteUser(id: number) {
    return apiClient.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
