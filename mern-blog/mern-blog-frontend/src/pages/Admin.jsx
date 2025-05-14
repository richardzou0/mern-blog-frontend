import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

// Backend URL stored in environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// React state to hold blog posts
const Admin = () => {
  // React state to hold blog posts
  const [posts, setPosts] = useState([]);
  // Holds the form data for creating or editing a post
  const [editPost, setEditPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", body: "" });
  const navigate = useNavigate();

  // Fetch all blog posts when the component first mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/account");
      return;
    }

    fetch(`${BACKEND_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [navigate]);

  // Handle deleting a post by ID
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${BACKEND_URL}/posts/${id}`, {
      method: "DELETE",
    });
    // Re-fetch the post list after deletion
    const res = await fetch(`${BACKEND_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  const startEditing = (post) => {
    setEditPost(post._id);
    setEditForm({ title: post.title, body: post.body });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await fetch(`${BACKEND_URL}/posts/${editPost}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    });

    // Clear edit state + refresh posts
    setEditPost(null);
    setEditForm({ title: "", body: "" });

    const res = await fetch(`${BACKEND_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setPosts(data);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Dashboard</h1>
      <p>You can manage all blog posts here.</p>
      <hr />
      {posts.map((post) =>
        editPost === post._id ? (
          <form key={post._id} onSubmit={handleEditSubmit}>
            <input
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <textarea
              name="body"
              value={editForm.body}
              onChange={handleEditChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditPost(null)}>
              Cancel
            </button>
          </form>
        ) : (
          <PostCard
            key={post._id}
            title={post.title}
            body={post.body}
            onDelete={() => handleDelete(post._id)}
            onEdit={() => startEditing(post)}
          />
        )
      )}
    </div>
  );
};

export default Admin;
