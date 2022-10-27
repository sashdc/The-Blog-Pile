const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
          attributes: ["id", "content", "title", "createdAt"],
          order: [
              ["createdAt", "DESC"]
          ],
          include: [{
                  model: User,
                  attributes: ["name"],
              },
              {
                  model: Comment,
                  attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                  include: {
                      model: User,
                      attributes: ["name"],
                  },
              },
          ],
      })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});


  module.exports = router;
