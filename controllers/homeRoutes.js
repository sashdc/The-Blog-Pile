const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

// getall posts for home page
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    console.log(postData);
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// accessing login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// load a page fr an individual post
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_title", "post_content", "createdAt", "user_id"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res
          .status(404)
          .json({ message: "No post found with this id, please try again" });
        return;
      }

      const post = dbPostData.get({ plain: true });

      req.session.save(() => {
        req.session.post_id = req.params.id;
        console.log(req.session.user_id)
        console.log(post.user_id)

        if (post.user_id === req.session.user_id) {
          res.render("user-posts", {
            post,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id,
            post_id: req.session.post_id,
          });
        } else {
          res.render("post", {
            post,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id,
            post_id: req.session.post_id,
          });
        }
console.log(post)
        // res.render("post", {
        //   post,
        //   loggedIn: req.session.loggedIn,
        // });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add a post when logged in
router.get("/newpost", withAuth, (req, res) => {
  res.render("newpost", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
