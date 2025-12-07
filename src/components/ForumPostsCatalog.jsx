import ForumPost from "./ForumPost";
import "../styles/ForumPostsCatalog.css";

const ForumPostsCatalog = () => {
  return (
    <section className="forum-posts-catalog">
      <div className="catalog-header">
        <h2>Coffee Forum</h2>
        <button className="create-post-btn">Create New Post</button>
      </div>

      <div className="posts-list">
        <ForumPost />
      </div>
    </section>
  );
};

export default ForumPostsCatalog;
