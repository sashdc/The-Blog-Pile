const { Post } = require("../models");

const postData = [
  {
    post_title: "The way things were",
    post_content:
      "Perhaps there were better ways to do things back then, but there were also worse, and quite frankly, if it's between leeches and ES6, I choose ES6.",
    user_id: 1,
  },
  {
    post_title: "Computers are scary",
    post_content:
      "The last time i turned on my computer, it made noises and a little smoke came out of it. I may not know the difference between a dragon and a computer, but i know that they both stop working when you stick a sword in them.",
    user_id: 4,
  },
  {
    post_title: "Why i started writing code upside, and why you should too! ",
    post_content:
      "For years people in the tech world have debated the best sitting position for working, but thanks to a whole bunch of macrodosing I have come across a new one, hanging upside down.",
    user_id: 3,
  },
  {
    post_title: "Puppies, better than cookies?",
    post_content:
      "Sure, you can use cookies to remember user information on your web app, but have you considered instead using puppies? They're fluffier, cuter, but do have to be walked a lot, so nevermind, let's stick to cookies.",
    user_id: 5,
  },
  {
    post_title: "My brain hurts",
    post_content:
      "Sometimes tech can be fun, like a playstation game, or laser tag. But sometimes you have to do an assignment a day after the previous assignment and a day before the next and your brang just starts gooping out your left ear. ",
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
