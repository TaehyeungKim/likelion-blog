import { instance } from "@/shared/api";

export const signIn = async (username, password) => {
  try {
    const response = await instance.post("/login", { username, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
