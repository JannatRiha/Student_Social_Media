// client/src/components/Users.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        };
        const res = await axios.get('/api/users', config);
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const sendFriendRequest = async (userId) => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      await axios.put(`/api/friends/request/${userId}`, null, config);

      // Update the UI to show the request was sent
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, friendRequestSent: true } : user
        )
      );
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  if (loading) {
    return <h1>Loading Users...</h1>;
  }

  return (
    <div className="users-page">
      <h1 className="users-title">Find New Friends</h1>
      <div className="users-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-avatar-placeholder">
                {user.name.charAt(0)}
              </div>
              <p className="user-name">{user.name}</p>
              <button
                onClick={() => sendFriendRequest(user._id)}
                className="friend-request-button"
              >
                {user.friendRequestSent ? 'Request Sent' : 'Add Friend'}
              </button>
            </div>
          ))
        ) : (
          <p>No users to display.</p>
        )}
      </div>
    </div>
  );
};

export default Users;