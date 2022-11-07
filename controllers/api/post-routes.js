const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a post when logged in
router.post("/", withAuth, (req, res) => {
  console.log('trying to create post')
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

// get a post to edit
router.get("/editpost", withAuth, async (req, res) => {
  const dbPostData = await Post.findAll({ where: { id: req.session.post_id } });

  const posts = dbPostData.map((post) => post.get({ plain: true }));
  post = posts[0];
  console.log(post);
  // console.log(post[0].post_title)
  res.render("editpost", {
    post,
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
    post_id: req.session.post_id,

  });
});

// Edit a post
router.put("/:id", withAuth, (req, res) => {
  console.log('trying to edit post')

  Post.update({
          post_title: req.body.post_title,
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


router.get('/newpost', withAuth, async(req,res) => {
  res.render('newpost', {loggedIn: req.session.loggedIn, user_id: req.session.user_id})
})
module.exports = router

  module.exports = router;
