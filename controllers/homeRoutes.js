const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');

// home page blog posts showng up
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

  module.exports = router;
