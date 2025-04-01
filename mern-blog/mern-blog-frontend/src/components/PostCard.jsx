// PostCard component displays a single blog post
// It can optionally include a delete button if onDelete is passed as a prop
const PostCard = ({ title, body, onDelete }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{title}</h3>
      <p>{body}</p>
      {onDelete && <button onClick={onDelete}>Delete</button>}
      <button>Edit</button>
    </div>
  );
};

export default PostCard;
