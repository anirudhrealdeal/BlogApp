import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>My Blog Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>Created: {post.createdAt}</p>
          <p>Updated: {post.updatedAt}</p>
          <p>Likes: {post.likes}</p>
          {/* Add edit and delete functionality */}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
