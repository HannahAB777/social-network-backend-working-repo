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
router.put('/:id', async (req, res) =>{
  await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).select("-__v")
  .then((updatedUser) => res.json(updatedUser))
  .catch((err) => res.status(500).json(err));
});

//delete to remove a user by its _id
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete({ _id: req.params.id })
    .then((deletedUser) => res.json(deletedUser))
    .catch((err) => res.status(500).json(err));
});

//bonus remove a users associated thoughts when deleted


//post to add a new friend to a users friends list
router.post('/:userId/friends/:friendId', async (req, res) =>{
  const user = await User.findByIdAndUpdate({_id: req.params.userId}, {$addToSet: { friends: req.params.friendId } }, {new: true});
  const usersFriend = await User.findByIdAndUpdate({_id: req.params.friendId}, {$addToSet: { friends: req.params.userId } }, {new: true}).select("-__v");
  if (res.status(200)) {
    res.status(200).json([{user},{usersFriend}]);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

//delete to remove a friend from a users friend list
router.delete('/:userId/friends/:friendId', async (req, res) =>{
  const user = await User.findByIdAndUpdate({_id: req.params.userId}, {$pullAll: {friends: [req.params.friendId] }} , {new: true});
  const usersFriend = await User.findByIdAndUpdate({_id: req.params.friendId}, {$pullAll: {friends: [req.params.userId] }}, {new: true}).select("-__v");
    if (res.status(200)) {
      res.status(200).json([{user},{usersFriend}]);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
});

module.exports = router;
