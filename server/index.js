import express from "express";
import cors from "cors";
import { posts } from "./data/posts.js";
import { tags } from "./data/tags.js";
import { users } from "./data/users.js";
import { findTagByContent } from "./utils/index.js";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET 게시물 전체 조회
app.get("/api/posts", (req, res) => {
  const responsePosts = posts.map((post) => {
    return {
      ...post,
      author: users.find((u) => u.id === post.author).username,
      tags: tags.filter((t) => post.tags.includes(t.id)),
    };
  });
  res.json(responsePosts);
});

// GET 특정 게시물 조회
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post)
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  const responsePost = {
    ...post,
    author: users.find((u) => u.id === post.author).username,
    tags: tags.filter((t) => post.tags.includes(t.id)),
  };
  res.json(responsePost);
});

// POST 게시물 생성
app.post("/api/posts", (req, res) => {
  const { title, content, author: requestAuthor, tags: requestTags } = req.body;
  const lastPostId = Math.max(...posts.map((p) => p.id));
  let lastTagId = Math.max(...tags.map((t) => t.id));

  const newTags = requestTags.map((tag) => {
    const existingTag = findTagByContent(tags, tag.content);
    if (existingTag) return existingTag.id;
    const newTag = {
      id: ++lastTagId,
      content: tag,
    };
    tags.push(newTag);
    return newTag.id;
  });

  const author = users.find((u) => u.username === requestAuthor).id;
  const newPost = {
    id: lastPostId + 1,
    title,
    content,
    author,
    tags: newTags,
    like_users: [],
    created_at: new Date().toISOString(),
  };
  posts.push(newPost);
  res.json({ message: "게시물 생성 성공", postId: newPost.id });
});

// GET 태그 조회
app.get("/api/tags", (req, res) => {
  const { postId } = req.query;
  if (postId === null || postId === undefined) res.json(tags);
  else {
    const post = posts.find((p) => p.id === parseInt(postId));
    if (!post)
      return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    const responseTags = tags.filter((t) => post.tags.includes(t.id));
    res.json(responseTags);
  }
});

// GET 유저 조회
app.get("/api/users", (req, res) => {
  const { id: userId } = req.query;
  if (userId === null || userId === undefined) res.json(users);
  else {
    const user = users.find((u) => u.id === parseInt(userId));
    if (!user)
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    res.json(user);
  }
});

// POST 로그인
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "로그인 실패" });
  res.json(user);
});

// POST 회원가입
app.post("/api/signup", (req, res) => {
  const { username, password, name, email, university, major } = req.body;
  const user = users.find((u) => u.username === username);
  if (user)
    return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
  const lastUserId = Math.max(...users.map((u) => u.id));
  const newUser = {
    id: lastUserId + 1,
    username,
    password,
    name,
    email,
    university,
    major,
  };
  users.push(newUser);
  res.json({ message: "회원가입 성공", userId: newUser.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
