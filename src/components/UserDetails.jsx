import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/UserDetails.css";

const UserDetails = () => {
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    imageURL: "",
    description: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    loadUserData();
  }, [user, navigate]);

  const loadUserData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3030/data/userProfiles?where=userId%3D%22${user.userId}%22`,
        {
          headers: {
            "X-Authorization": user.accessToken,
          },
        }
      );

      // 404 means collection doesn't exist yet, which is fine
      if (response.ok) {
        const profiles = await response.json();

        if (profiles.length > 0) {
          const profile = profiles[0];
          setFormData({
            imageURL: profile.imageURL || "",
            description: profile.description || "",
          });
        } else {
          // No profile exists yet
          setFormData({
            imageURL: "",
            description: "",
          });
        }
      } else if (response.status === 404) {
        // Collection doesn't exist yet, use user context data
        setFormData({
          imageURL: "",
          description: "",
        });
      } else {
        setFormData({
          imageURL: "",
          description: "",
        });
      }
    } catch (err) {
      console.error("Something broke:", err);
      setFormData({
        imageURL: "",
        description: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const checkResponse = await fetch(
        `http://localhost:3030/data/userProfiles?where=userId%3D%22${user.userId}%22`,
        {
          headers: {
            "X-Authorization": user.accessToken,
          },
        }
      );

      let existingProfiles = [];

      if (checkResponse.ok) {
        existingProfiles = await checkResponse.json();
      }

      let response;

      const profileData = {
        userId: user.userId,
        username: user.username,
        email: user.email,
        imageURL: formData.imageURL,
        description: formData.description,
      };

      if (existingProfiles.length > 0) {
        response = await fetch(
          `http://localhost:3030/data/userProfiles/${existingProfiles[0]._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Authorization": user.accessToken,
            },
            body: JSON.stringify(profileData),
          }
        );
      } else {
        response = await fetch("http://localhost:3030/data/userProfiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": user.accessToken,
          },
          body: JSON.stringify(profileData),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Edit failed.");
        setIsSaving(false);
        return;
      }

      setSuccess("Profile updated successfully.");
      setIsSaving(false);
    } catch (err) {
      setError("Network error. Try again.");
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="user-details-page">
        <div className="user-details-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="user-details-page">
      <div className="user-details-container">
        <h2>{user.username}'s Profile</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="user-details-form" onSubmit={handleSubmit}>
          {formData.imageURL && (
            <div className="profile-image-section">
              <div className="profile-image">
                <img src={formData.imageURL} alt="Profile" />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="imageURL">Profile Image URL</label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="https://somesite.com/someimage.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Brief Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button type="submit" className="btn-save" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
