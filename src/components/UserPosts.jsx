import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../styles/UserPosts.css";

const UserPosts = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadUserPosts();
  }, []);

  const loadUserPosts = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:3030/data/forumPosts?where=authorId%3D%22${user.userId}%22`,
        {
          headers: {
            "X-Authorization": user.accessToken,
          },
        }
      );

      if (response.ok) {
        const posts = await response.json();
        const sortedPosts = posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUserPosts(sortedPosts);
      }
    } catch (err) {
      console.error("Error loading user posts:", err);
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${postTitle}"? This will also delete all comments on this post.`
    );

    if (!confirmed) return;

    setDeletingPostId(postId);
    setError("");
    setSuccess("");

    try {
      const commentsResponse = await fetch(
        `http://localhost:3030/data/comments?where=postId%3D%22${postId}%22`,
        {
          headers: {
            "X-Authorization": user.accessToken,
          },
        }
      );

      if (commentsResponse.ok) {
        const comments = await commentsResponse.json();

        await Promise.all(
          comments.map((comment) =>
            fetch(`http://localhost:3030/data/comments/${comment._id}`, {
              method: "DELETE",
              headers: {
                "X-Authorization": user.accessToken,
              },
            })
          )
        );
      }

      const deleteResponse = await fetch(
        `http://localhost:3030/data/forumPosts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "X-Authorization": user.accessToken,
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete post.");
      }

      setUserPosts(userPosts.filter((post) => post._id !== postId));
      setSuccess("Post deleted successfully.");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post. Please try again.");
    } finally {
      setDeletingPostId(null);
    }
  };

  return (
    <div className="user-posts-section">
      <h3>Your Forum Posts</h3>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {userPosts.length === 0 ? (
        <p className="no-posts-text">You haven't created any posts yet.</p>
      ) : (
        <ul className="user-posts-list">
          {userPosts.map((post) => (
            <li key={post._id} className="user-post-item">
              <span className="post-title">
                {post.title.length > 30
                  ? post.title.substring(0, 30) + "..."
                  : post.title}
              </span>
              <div className="post-actions">
                <button
                  onClick={() => navigate(`/forum/${post._id}`)}
                  className="btn-edit-post"
                >
                  View/Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post._id, post.title)}
                  className="btn-delete-post"
                  disabled={deletingPostId === post._id}
                >
                  {deletingPostId === post._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPosts;
