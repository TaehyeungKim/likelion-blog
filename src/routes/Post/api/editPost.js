import { instance } from "@/shared/api";

/**
 * 게시물 수정
 * @param {number} postId
 * @param {{
 *  title: string;
 *  content: string;
 *  tags: string[];
 * }} post
 * @returns {Promise<{
 * message: string,
 * postId: number
 * }>}
 */
export const editPost = async (postId, post) => {
  try {
    const response = await instance.put(`/posts/${postId}`, post);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
