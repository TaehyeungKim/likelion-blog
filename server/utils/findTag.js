/**
 * 태그 조회
 * @param {Array<{
 *  id: number;
 *  content: string;
 * }>} tags
 * @param {string} content
 * @returns {{
 *  id: number;
 *  content: string;
 * } | undefined}
 */
export const findTagByContent = (tags, content) => {
  return tags.find((tag) => tag.content === content);
};
