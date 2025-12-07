import "../styles/ForumPost.css";

const ForumPost = () => {
  return (
    <div className="forum-post">
      <div className="post-header">
        <h3>
          <a href="#">title</a>
        </h3>
        <div className="post-meta">
          <span className="author">by post_author</span>
          <span className="date">post_created_at</span>
        </div>
      </div>
      <p className="post-excerpt">content</p>
      <div className="post-footer">
        <span className="comments-count">comments count</span>
        <a href="#" className="read-more">
          Read More →
        </a>
      </div>
    </div>
  );
};

export default ForumPost;
