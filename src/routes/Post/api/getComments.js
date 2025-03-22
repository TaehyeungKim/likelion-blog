import { instance } from "@/shared/api";

/**
 * 게시물의 댓글 조회
 * @param {number} postId
 * @returns {Promise<{
 *  comments: {
 *    id: number;
 *    content: string;
 *    author: number;
 *    authorName: string;
 *    created_at: string;
 *  }[];
 * }>}
 */
export const getComments = async (postId) => {
  try {
    const response = await instance.get(`/comments?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 상세 조회
 * @param {number} commentId
 * @returns {Promise<{
 *  comment: {
 *    id: number;
 *    content: string;
 *    author: number;
 *    authorName: string;
 *    created_at: string;
 *  }[];
 * }>}
 */
export const getCommentById = async (commentId) => {
  try {
    const response = await instance.get(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
