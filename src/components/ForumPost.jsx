import { Link } from "react-router-dom";
import "../styles/ForumPost.css";

const ForumPost = ({ post }) => {
  const truncateContent = (text, maxLength = 20) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength);
  };

  const shouldTruncate = post.content.length > 20;
  const displayContent = truncateContent(post.content, 20);

  return (
    <div className="forum-post">
      <div className="post-header">
        <h3>
          <Link to={`/forum/${post._id}`}>{post.title}</Link>
        </h3>
        <div className="post-meta">
          <span className="author">by {post.author}</span>
          <span className="date">
            {new Date(post.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
      </div>
      <p className="post-excerpt">
        {displayContent}
        {shouldTruncate && "..."}
      </p>
      <div className="post-footer">
        <span className="comments-count">
          {post.commentCount || 0}{" "}
          {post.commentCount === 1 ? "comment" : "comments"}
        </span>
        {shouldTruncate && (
          <Link to={`/forum/${post._id}`} className="read-more">
            Read More →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ForumPost;
