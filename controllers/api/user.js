const router = require("express").Router();
const User = require("../../models/users");
const db = require("../../config/connection");

//create a user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users
router.get("/", async (req, res) => {
  await User.find({})
    .then((userData) => res.json(userData))
    .catch((err) => res.status(500).json(err));
});

//get a single user by its _id and populated thoughts and data
router.get("/:id", async (req, res) => {
  await User.findById({ _id: req.params.id })
    .select("-__v")
    .populate("friends")
    .populate("thoughts")
    .then((oneUser) => res.json(oneUser))
    .catch((err) => res.status(500).json(err));
});

//put to update a user by its id

//delete to remove a user by its _id

//bonus remove a users associated thoughts when deleted

//api/users/:userId/friends/:friendsId

//post to add a new friend to a users friends list

//delete to remove a friend from a users friend list

module.exports = router;
