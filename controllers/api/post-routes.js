const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_content", "post_title", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
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

// Create a post when logged in
router.post("/", withAuth, (req, res) => {
  Post.create({
    post_title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// grab single post by id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_content", "post_title", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id, please try again",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Edit a post
router.put("/:id", withAuth, (req, res) => {
  Post.update({
          post_title: req.body.title,
          post_content: req.body.post_content,
      }, {
          where: {
              id: req.params.id,
          },
      })
      .then((dbPostData) => {
          if (!dbPostData) {
              res.status(404).json({
                  message: "No post found with this id, please try again"
              });
              return;
          }
          res.json(dbPostData);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

//Delete a post
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
          where: {
              id: req.params.id,
          },
      })
      .then((dbPostData) => {
          if (!dbPostData) {
              res.status(404).json({
                  message: "No post found with this id, please try again"
              });
              return;
          }
          res.json(dbPostData);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

  module.exports = router;
