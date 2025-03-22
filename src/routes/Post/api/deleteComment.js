import { instance } from "@/shared/api";

export const deleteComment = async (commentId) => {
  try {
    const response = await instance.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
