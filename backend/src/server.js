const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
mongoose.connect('mongodb://localhost:27017/goblo-blog-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the blog post model
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  likes: Number,
});

const Post = mongoose.model('Post', postSchema);

// API endpoints
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().limit(10);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
