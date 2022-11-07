const { User } = require("../models");
const bcrypt = require("bcrypt");

const userData = [
  {
    username: "effery",
    password: bcrypt.hashSync("blageron", 10),
  },
  {
    username: "E_Krantz",
    password: bcrypt.hashSync("evilempire", 10),
  },
  {
    username: "Kamlet",
    password: bcrypt.hashSync("graciousmisogyny", 10),
  },
  {
    username: "Spamalot",
    password: bcrypt.hashSync("244466666", 10),
  },
  {
    username: "Magarno",
    password: bcrypt.hashSync("garibaldicried", 10),
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
