import { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${BACKEND_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", body: "" });
    const res = await fetch(`${BACKEND_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>My Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <textarea
          name="body"
          placeholder="Write your post here..."
          value={form.body}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit">Post</button>
      </form>

      <hr />

      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: "20px" }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
