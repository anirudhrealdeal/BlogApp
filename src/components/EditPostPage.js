import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPostPage = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`/api/posts/${postId}`)
      .then(response => {
        const post = response.data;
        setTitle(post.title);
        setDescription(post.description);
      })
      .catch(error => {
        console.error(error);
      });
  }, [postId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedPost = {
      title,
      description
    };

    axios.put(`/api/posts/${postId}`, updatedPost)
      .then(response => {
        console.log('Post updated successfully:', response.data);
        // Optionally, redirect to the home page or update the posts list
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={event => setDescription(event.target.value)} />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPostPage;
