import React, { useState } from 'react';
import axios from 'axios';

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      title,
      description
    };

    axios.post('/api/posts', newPost)
      .then(response => {
        console.log('Post created successfully:', response.data);
        // Optionally, redirect to the home page or update the posts list
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={event => setDescription(event.target.value)} />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPostPage;
