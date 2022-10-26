const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "This is very true, well done.",
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: "This is very untrue, you should be ashamed.",
    user_id: 3,
    post_id: 2
  },
  {
    comment_text: "This is very neutral. YOu too shoudl be ashamed.",
    user_id: 5,
    post_id: 5
  },
  {
    comment_text: "This is very something else. I dislike you for it.",
    user_id: 2,
    post_id: 4
  },
  {
    comment_text: "This is the worst thing i have ever read. Well done",
    user_id: 2,
    post_id: 4
  },
];

const commentPosts = () => Comment.bulkCreate(commentData);

module.exports = commentPosts;
