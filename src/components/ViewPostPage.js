import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPostPage = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [postId]);

  return (
    <div>
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>Created: {post.createdAt}</p>
          <p>Updated: {post.updatedAt}</p>
          <p>Likes: {post.likes}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewPostPage;
