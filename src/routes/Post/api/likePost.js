import { instance } from "@/shared/api";

export const likePost = async (userId, postId) => {
  try {
    const response = await instance.post(`/posts/${postId}/like`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
