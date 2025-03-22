import { instance } from "@/shared/api";

/**
 * 댓글 생성
 * @param {number} postId
 * @param {string} content
 * @param {number} author
 * @returns {Promise<{
 *  message: string;
 *  commentId: number;
 * }>}
 */
export const createComment = async (postId, content, author) => {
  try {
    const response = await instance.post(`/comments`, {
      postId,
      content,
      author,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
