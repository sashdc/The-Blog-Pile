const { User } = require('../models');

const userData = [
    {
      username: "effery",
      password: "blageron",
    },
    {
      username: "E_Krantz",
        password: "eggiby23",
      },
      {
        username: "Kamlet",
        password: "ethlereddy2",
      },
      {
        username: "Spamalot",
        password: "evilempire",
      },
      {
        username: "Magarno",
        password: "hdasjkd",
      },
  ];
  
  const seedUsers = () => User.bulkCreate(userData);
  
  module.exports = seedUsers;