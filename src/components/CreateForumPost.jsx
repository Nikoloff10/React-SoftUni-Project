import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/CreateForumPost.css";

const CreateForumPost = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="forum-post" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="modal-title">Create New Post</h2>

        <input className="input-title" placeholder="Title" />

        <textarea className="input-content" placeholder="Content" />

        <button className="post-button">
          <FontAwesomeIcon icon={faMugHot} />
        </button>
      </div>
    </div>
  );
};

export default CreateForumPost;
