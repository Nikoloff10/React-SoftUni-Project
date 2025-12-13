import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "../styles/CreateForumPost.css";

const CreateForumPost = ({ isOpen, onClose, onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(UserContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    if (!user) {
      alert("Please login to create a post.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newPost = {
        title: title.trim(),
        content: content.trim(),
        author: user.username,
        authorId: user.userId,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3030/data/forumPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": user.accessToken,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post.");
      }

      const createdPost = await response.json();

      setTitle("");
      setContent("");

      if (onPostCreated) {
        onPostCreated({ ...createdPost, commentCount: 0 });
      }

      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="forum-post" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="modal-title">Create New Post</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="input-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />

          <textarea
            className="input-content"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />

          <button type="submit" className="post-button" disabled={isSubmitting}>
            <FontAwesomeIcon icon={faMugHot} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForumPost;
