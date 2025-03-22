import express from "express";
import cors from "cors";
import { posts } from "./data/posts.js";
import { tags } from "./data/tags.js";
import { users } from "./data/users.js";
import { comments } from "./data/comments.js";
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
      authorName: users.find((u) => u.id === post.author).username,
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
    authorName: users.find((u) => u.id === post.author).username,
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
    const existingTag = findTagByContent(tags, tag);
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
    comments: [],
    created_at: new Date().toISOString(),
  };
  posts.push(newPost);
  res.json({ message: "게시물 생성 성공", postId: newPost.id });
});

app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, tags: requestTags } = req.body;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post)
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  post.title = title;
  post.content = content;

  let lastTagId = Math.max(...tags.map((t) => t.id));
  const newTags = requestTags.map((tag) => {
    const existingTag = findTagByContent(tags, tag);
    if (existingTag) return existingTag.id;
    const newTag = {
      id: ++lastTagId,
      content: tag,
    };
    tags.push(newTag);
    return newTag.id;
  });
  post.tags = newTags;
  res.json({ message: "게시물 수정 성공", postId: post.id });
});

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post)
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  const storedPosts = [...posts];
  while (posts.length !== 0) posts.pop();
  const afterDeletePosts = storedPosts.filter((p) => p.id !== parseInt(id));
  for (let i = 0; i < afterDeletePosts.length; i++)
    posts.push(afterDeletePosts[i]);
  res.json({ message: "게시물 삭제 성공", postId: post.id });
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

app.get("/api/comments", (req, res) => {
  const { postId } = req.query;
  if (postId === null || postId === undefined) res.json(comments);
  else {
    const post = posts.find((p) => p.id === parseInt(postId));
    if (!post)
      return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    const responseComments = comments
      .filter((c) => post.comments.includes(c.id))
      .map((c) => {
        return {
          ...c,
          authorName: users.find((u) => u.id === c.author).username,
        };
      });
    res.json(responseComments);
  }
});

app.get("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === parseInt(id));
  if (!comment)
    return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
  res.json({
    ...comment,
    authorName: users.find((u) => u.id === comment.author).username,
  });
});

app.post("/api/comments", (req, res) => {
  const { postId, content, author } = req.body;
  const lastCommentId = Math.max(...comments.map((c) => c.id));
  const newComment = {
    id: lastCommentId + 1,
    content,
    author,
    created_at: new Date().toISOString(),
  };
  comments.push(newComment);

  const post = posts.find((p) => p.id === parseInt(postId));
  if (!post)
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  post.comments.push(newComment.id);

  res.json({ message: "댓글 생성 성공", commentId: newComment.id });
});

app.put("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const comment = comments.find((c) => c.id === parseInt(id));
  if (!comment)
    return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
  comment.content = content;
  res.json({ message: "댓글 수정 성공", commentId: comment.id });
});

app.delete("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === parseInt(id));
  if (!comment)
    return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
  const post = posts.find((p) => p.comments.includes(parseInt(id)));
  if (!post)
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  post.comments = post.comments.filter((c) => c !== parseInt(id));
  const storedComments = [...comments];
  while (comments.length !== 0) comments.pop();
  const afterDeleteComments = storedComments.filter(
    (c) => c.id !== parseInt(id)
  );
  for (let i = 0; i < afterDeleteComments.length; i++)
    comments.push(afterDeleteComments[i]);
  res.json({ message: "댓글 삭제 성공", commentId: comment.id });
});

app.post("/api/posts/:id/like", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post)
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  if (post.like_users.includes(req.body.userId)) {
    post.like_users = post.like_users.filter((u) => u !== req.body.userId);
    res.json({ message: "좋아요 취소 성공", postId: post.id });
  } else {
    post.like_users.push(req.body.userId);
    res.json({ message: "좋아요 추가 성공", postId: post.id });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
