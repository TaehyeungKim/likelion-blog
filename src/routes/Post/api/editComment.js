import { instance } from "@/shared/api";

export const editComment = async (commentId, content) => {
  try {
    const response = await instance.put(`/comments/${commentId}`, { content });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
