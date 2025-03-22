import { instance } from "@/shared/api";

/**
 * 회원가입
 * @param {Object} userInfo
 * @param {string} userInfo.username
 * @param {string} userInfo.password
 * @param {string} userInfo.name
 * @param {string} userInfo.email
 * @param {string} userInfo.university
 * @param {string} userInfo.major
 * @returns {Promise<{
 *  message: string;
 *  userId: number;
 * }>}
 */
export const signUp = async (userInfo) => {
  try {
    const response = await instance.post("/signup", userInfo);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
