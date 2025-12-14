import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "../styles/ForumPostDetails.css";

const ForumPostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPostDetails();
    fetchComments();
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/data/forumPosts/${postId}`
      );
      if (!response.ok) throw new Error("Failed to fetch post.");
      const data = await response.json();
      setPost(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/data/comments?where=postId%3D%22${postId}%22`
      );
      if (!response.ok) throw new Error("Failed to fetch comments.");
      const data = await response.json();

      const sortedComments = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleEditClick = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle("");
    setEditContent("");
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        `http://localhost:3030/data/forumPosts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": user.accessToken,
          },
          body: JSON.stringify({
            title: editTitle,
            content: editContent,
            author: post.author,
            authorId: post.authorId,
            createdAt: post.createdAt,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update post.");

      setPost({
        ...post,
        title: editTitle,
        content: editContent,
      });
      setIsEditing(false);
      setEditTitle("");
      setEditContent("");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim() || !user) return;

    const newComment = {
      postId: postId,
      content: commentContent,
      author: user.username,
      authorId: user.userId,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:3030/data/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": user.accessToken,
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) throw new Error("Failed to add comment.");

      const createdComment = await response.json();
      setComments([...comments, createdComment]);
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading post...</div>;
  }

  if (!post) {
    return <div className="error">Post not found.</div>;
  }

  return (
    <div className="forum-post-details">
      <button className="back-button" onClick={() => navigate("/forum")}>
        Back to Forum
      </button>

      <article className="post-content">
        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="edit-post-form">
            <input
              type="text"
              className="edit-title-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Post title..."
            />
            <textarea
              className="edit-content-input"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Post content..."
              rows="10"
            />
            <div className="edit-buttons">
              <button
                type="submit"
                className="save-edit-btn"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={handleCancelEdit}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="post-header">
              <h1 className="post-title">{post.title}</h1>
              {user && user.userId === post.authorId && (
                <button className="edit-post-btn" onClick={handleEditClick}>
                  Edit Post
                </button>
              )}
            </div>
            <div className="post-meta">
              <span className="author">By {post.author}</span>
              <span className="date">
                {new Date(post.createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="post-body">{post.content}</div>
          </>
        )}
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>

        {user ? (
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              className="comment-input"
              placeholder="Write a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              rows="3"
            />
            <button type="submit" className="submit-comment-btn">
              Post Comment
            </button>
          </form>
        ) : (
          <p className="login-prompt">Please login to comment.</p>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-header">
                  <span className="comment-author">by {comment.author}</span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ForumPostDetails;
