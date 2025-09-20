const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogs);
});

// @desc    Get a single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  res.status(200).json(blog);
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, author, tags } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error('Title and content are required');
  }
  const blog = await Blog.create({ title, content, author, tags });
  res.status(201).json(blog);
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedBlog);
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  await blog.deleteOne(); // Use deleteOne() instead of remove()
  res.status(200).json({ id: req.params.id, message: 'Blog post removed' });
});

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };