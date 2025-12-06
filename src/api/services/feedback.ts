import apiClient from "../apiClient";
export interface CreateFeedbackDto {
  fullName: string;
  phone: string;
  email: string;
  title: string;
  content: string;
}

export interface Feedback {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface FeedbackListResponse {
  success: boolean;
  message: string;
  data: Feedback[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const feedbackService = {
  create: async (
    data: CreateFeedbackDto
  ): Promise<{ success: boolean; message: string; data: Feedback }> => {
    const response = await apiClient.post({
      url: "/feedback",
      data,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Feedback;
    };
  },

  getAll: async (
    page: number = 1,
    limit: number = 20,
    options: {
      search?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<FeedbackListResponse> => {
    const response = await apiClient.get({
      url: "/feedback/admin",
      params: { page, limit, ...(options || {}) },
    });
    return response.data;
  },

  getById: async (id: string): Promise<Feedback> => {
    const response = await apiClient.get({
      url: `/feedback/admin/${id}`,
    });
    return response.data.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete({
      url: `/feedback/admin/${id}`,
    });
    return response.data;
  },
};
