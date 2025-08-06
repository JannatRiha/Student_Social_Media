// client/src/components/PostCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // <-- Add this import
import './PostCreate.css';

const PostCreate = () => {
  const navigate = useNavigate();
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => { // <-- Make the function async
    e.preventDefault();
    try {
      // Create a FormData object to send text and the image file
      const formData = new FormData();
      formData.append('text', postText);
      if (postImage) {
        formData.append('image', postImage); // <-- 'image' is the field name for multer
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // <-- Important for file uploads
          'x-auth-token': localStorage.getItem('token'), // <-- Get the token from local storage
        },
      };

      const res = await axios.post('/api/posts', formData, config);
      console.log('Post created:', res.data);

      // Redirect to the timeline after successful post
      navigate('/timeline');
    } catch (err) {
      console.error(err.response.data);
      // Optional: Add a state to display error message to the user
    }
  };

  return (
    <div className="post-create-container">
      <h1 className="create-post-title">Create a New Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={postText}
          onChange={handleTextChange}
        />
        <input
          type="file"
          className="post-image-input"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit" className="submit-post-button">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostCreate;