import { instance } from "@/shared/api";

/**
 * 게시물 전체 조회
 * @returns  {Promise<{
 *  id: number;
 *  title: string;
 *  content: string;
 *  author: string;
 *  authorName: string;
 *  tags: {
 *    id: number;
 *    content: string;
 *  }[];
 *  like_users: number[];
 *  created_at: string;
 * }>}
 */
export const getPosts = async () => {
  try {
    const response = await instance.get("/posts");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시물 상세 조회
 * @param {number} postId
 * @returns {Promise<{
 *  id: number;
 *  title: string;
 *  content: string;
 *  author: string;
 *  authorName: string;
 *  tags: {
 *    id: number;
 *    content: string;
 *  }[];
 *  like_users: number[];
 *  created_at: string;
 * }>}
 */
export const getPostById = async (postId) => {
  try {
    const response = await instance.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
