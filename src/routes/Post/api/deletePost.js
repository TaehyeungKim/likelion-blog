import { instance } from "@/shared/api";

export const deletePost = async (postId) => {
  try {
    const response = await instance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
