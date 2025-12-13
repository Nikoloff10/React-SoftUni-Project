import ForumPost from "./ForumPost";
import "../styles/ForumPostsCatalog.css";
import CreateForumPost from "./CreateForumPost";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ForumPostsCatalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const [postsResponse, commentsResponse] = await Promise.all([
        fetch("http://localhost:3030/data/forumPosts"),
        fetch("http://localhost:3030/data/comments"),
      ]);

      if (!postsResponse.ok) throw new Error("Failed to fetch posts");
      const postsData = await postsResponse.json();
      const commentsData = commentsResponse.ok
        ? await commentsResponse.json()
        : [];

     
      const commentCounts = commentsData.reduce((acc, comment) => {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
        return acc;
      }, {});

     
      const postsWithComments = postsData.map((post) => ({
        ...post,
        commentCount: commentCounts[post._id] || 0,
      }));

      const sortedPosts = postsWithComments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <section className="forum-posts-catalog">
      <div className="catalog-header">
        <h2>Coffee Forum</h2>
        {user && (
          <button
            className="create-post-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Create New Post
          </button>
        )}
      </div>

      <CreateForumPost
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />

      <div className="posts-list">
        {isLoading ? (
          <p className="loading-message">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="no-posts-message">
            No posts yet.{" "}
            {user
              ? "Be the first to create one!"
              : "Login to create the first post!"}
          </p>
        ) : (
          posts.map((post) => <ForumPost key={post._id} post={post} />)
        )}
      </div>
    </section>
  );
};

export default ForumPostsCatalog;
