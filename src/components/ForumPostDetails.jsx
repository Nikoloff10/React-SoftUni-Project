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
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setComments(sortedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
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
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="author">By {post.author}</span>
          <span className="date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="post-body">{post.content}</div>
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
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
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
