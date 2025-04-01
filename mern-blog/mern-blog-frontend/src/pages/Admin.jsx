import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

// Backend URL stored in environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// React state to hold blog posts
const Admin = () => {
  // React state to hold blog posts
  const [posts, setPosts] = useState([]);

  // Fetch all blog posts when the component first mounts
  useEffect(() => {
    fetch(`${BACKEND_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Handle deleting a post by ID
  const handleDelete = async (id) => {
    await fetch(`${BACKEND_URL}/posts/${id}`, {
      method: "DELETE",
    });
    // Re-fetch the post list after deletion
    const res = await fetch(`${BACKEND_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Dashboard</h1>
      <p>You can manage all blog posts here.</p>
      <hr />
      {posts.map((post) => (
        <PostCard
          key={post._id}
          title={post.title}
          body={post.body}
          onDelete={() => handleDelete(post._id)}
        />
      ))}
    </div>
  );
};

export default Admin;
