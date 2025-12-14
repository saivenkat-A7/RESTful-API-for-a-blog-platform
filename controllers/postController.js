const { Post, Author } = require("../models");

exports.createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body; // ✅ changed from author_id

    if (!title || !content || !authorId) {
      return res.status(400).json({ message: "Title, content, and authorId are required" });
    }

    const author = await Author.findByPk(authorId);
    if (!author) return res.status(400).json({ message: "Author does not exist" });

    const post = await Post.create({ title, content, authorId }); // ✅ changed from author_id
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const where = {};
    if (req.query.authorId) where.authorId = req.query.authorId; // ✅ changed from author_id

    const posts = await Post.findAll({
      where,
      include: { model: Author, attributes: ["name", "email"] },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: { model: Author, attributes: ["name", "email"] },
    });

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.update(req.body);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.destroy();
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
