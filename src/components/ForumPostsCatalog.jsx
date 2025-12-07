import ForumPost from "./ForumPost";
import "../styles/ForumPostsCatalog.css";
import CreateForumPost from "./CreateForumPost";
import { useState } from "react";

const ForumPostsCatalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="forum-posts-catalog">
      <div className="catalog-header">
        <h2>Coffee Forum</h2>
        <button
          className="create-post-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Post
        </button>
      </div>

      <CreateForumPost
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="posts-list">
        <ForumPost />
      </div>
    </section>
  );
};

export default ForumPostsCatalog;
