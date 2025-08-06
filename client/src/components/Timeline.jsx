// client/src/components/Timeline.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Timeline.css';

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        };

        const res = await axios.get('/api/posts', config);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to handle liking and unliking a post
  const onLike = async (postId) => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };

      // Check if the user has already liked the post
      const postToUpdate = posts.find(post => post._id === postId);
      const hasLiked = postToUpdate.likes.some(like => like.user === localStorage.getItem('userId'));

      const endpoint = hasLiked ? `/api/posts/unlike/${postId}` : `/api/posts/like/${postId}`;

      const res = await axios.put(endpoint, null, config);

      // Update the posts state with the new likes count
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, likes: res.data } : post
        )
      );
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  if (loading) {
    return <h1>Loading Posts...</h1>;
  }

  return (
    <div className="timeline-page">
      <h1 className="timeline-title">User Timeline</h1>
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <div className="post-author-info">
                  <div className="post-avatar-placeholder">{post.name.charAt(0)}</div>
                  <p className="post-author-name">{post.name}</p>
                </div>
                <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
              </div>
              <p className="post-text">{post.text}</p>
              {post.image && (
                <div className="post-image-container">
                  <img src={post.image} alt="Post" className="post-image" />
                </div>
              )}

              <div className="post-actions">
                <button onClick={() => onLike(post._id)} className="like-button">
                  Like
                </button>
                <span>{post.likes.length}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts-message">No posts to display yet. Be the first to post!</p>
        )}
      </div>
      <Link to="/create-post" className="post-button">Post</Link>
    </div>
  );
};

export default Timeline;