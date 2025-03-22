import { instance } from "@/shared/api";

/**
 * 게시물 생성
 * @param {Object} post
 * @param {string} post.title
 * @param {string} post.content
 * @param {string} post.author
 * @param {string[]} post.tags
 * @returns {Promise<{
 *  message: string;
 *  postId: number;
 * }>}
 */
export const createPost = async (post) => {
  try {
    const response = await instance.post("/posts", post);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
