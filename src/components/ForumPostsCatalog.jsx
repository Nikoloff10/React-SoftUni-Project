import ForumPost from "./ForumPost";
import "../styles/ForumPostsCatalog.css";
import CreateForumPost from "./CreateForumPost";
import { useState } from "react";

const ForumPostsCatalog = () => {
  const [isClicked, setIsClicked] = useState();
  function createPostHandler() {
    if (!isClicked) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }

  return (
    <section className="forum-posts-catalog">
      <div className="catalog-header">
        <h2>Coffee Forum</h2>
        <button className="create-post-btn" onClick={createPostHandler}>
          Create New Post
        </button>
      </div>
      {isClicked && <CreateForumPost />}
      <div className="posts-list">
        <ForumPost />
      </div>
    </section>
  );
};

export default ForumPostsCatalog;
