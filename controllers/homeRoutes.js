const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

// getall posts for home page
router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  console.log(postData)
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  console.log (posts)
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
            });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

router.get("/post/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_title", "post_content", "createdAt"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({
            message: "No post found with this id",
          });
          return;
        }

        const post = dbPostData.get({
          plain: true,
        });

        res.render("post", {
          post,
          loggedIn: req.session.loggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  module.exports = router;
