const { User } = require('../models');

const userData = [
    {
      name: "Mark Sanchez",
      password: "blageron",
    },
    {
        name: "Eleanor Krantz",
        password: "eggiby23",
      },
      {
        name: "Kirk Hamlet",
        password: "ethlereddy2",
      },
      {
        name: "Spader Ham",
        password: "evilempire",
      },
      {
        name: "Marisa Singh",
        password: "hdasjkd",
      },
  ];
  
  const seedUsers = () => User.bulkCreate(userData);
  
  module.exports = seedUsers;