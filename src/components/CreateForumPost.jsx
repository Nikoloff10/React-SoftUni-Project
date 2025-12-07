import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import "../styles/CreateForumPost.css";

const CreateForumPost = () => {
  return (
    <div className="forum-post">
      <input className="input-title" defaultValue="Title" />

      <textarea className="input-content" defaultValue="Content" />

      <button className="post-button">
        <FontAwesomeIcon icon={faMugHot} />
      </button>
    </div>
  );
};

export default CreateForumPost;
