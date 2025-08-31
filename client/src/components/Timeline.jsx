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

  // Like / Unlike Post
  const onLike = async (postId) => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };

      const postToUpdate = posts.find((post) => post._id === postId);
      const hasLiked = postToUpdate.likes.some(
        (like) => like.user === localStorage.getItem('userId')
      );

      const endpoint = hasLiked ? `/api/posts/unlike/${postId}` : `/api/posts/like/${postId}`;

      const res = await axios.put(endpoint, null, config);

      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, likes: res.data } : post
        )
      );
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  // Add Comment
  const onComment = async (postId, text) => {
    if (!text.trim()) return; // Prevent empty comments
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      };

      const body = { text };
      const res = await axios.post(`/api/posts/comment/${postId}`, body, config);

      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, comments: res.data } : post
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
              {/* Post Header */}
              <div className="post-header">
                <div className="post-author-info">
                  <div className="post-avatar-placeholder">{post.name.charAt(0)}</div>
                  <p className="post-author-name">{post.name}</p>
                </div>
                <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
              </div>

              {/* Post Text */}
              <p className="post-text">{post.text}</p>

              {/* Post Image */}
              {post.image && (
                <div className="post-image-container">
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt="Post"
                    className="post-image"
                  />
                </div>
              )}

              {/* Like Button */}
              <div className="post-actions">
                <button onClick={() => onLike(post._id)} className="like-button">
                  Like
                </button>
                <span>{post.likes.length}</span>
              </div>

              {/* Comments Section */}
              <div className="comments-section">
                {/* Display Comments */}
                {post.comments && post.comments.length > 0 && (
                  <div className="comments-list">
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="comment-item">
                        <p>
                          <span className="comment-author">{comment.name}:</span> {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Form */}
                <form
                  className="comment-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const text = e.target.commentText.value;
                    onComment(post._id, text);
                    e.target.commentText.value = '';
                  }}
                >
                  <input
                    type="text"
                    name="commentText"
                    placeholder="Add a comment..."
                    className="comment-input"
                  />
                  <button type="submit" className="comment-button">
                    Comment
                  </button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts-message">No posts to display yet. Be the first to post!</p>
        )}
      </div>

      <Link to="/create-post" className="post-button">
        Post
      </Link>
    </div>
  );
};

export default Timeline;
