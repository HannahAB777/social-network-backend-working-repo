const router = require("express").Router();
const Thought = require("../../models/thought");
const User = require('../../models/users');
const Reaction = require("../../models/reaction");
const db = require("../../config/connection");


//get to get all thoughts
router.get("/", async (req, res) => {
  await Thought.find({})
    .then((thoughtData) => res.json(thoughtData))
    .catch((err) => res.status(500).json(err));
});

//get to get a single thought by its _id
router.get("/:id", async (req, res) => {
  await Thought.findById({ _id: req.params.id })
    .select("-__v")
    .then((oneThought) => res.json(oneThought))
    .catch((err) => res.status(500).json(err));
});

//post to create a new thought (dont forget to push the created thoughts _id to the associated users thoughts array field)

router.post("/", async (req, res) => {
    const newThought = await Thought.create({thoughtText: req.body.thoughtText,
    userName:req.body.userName});
    const updatedUser = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id} },
        { new: true }
      ).select("-__v");
    if (res.status(200)) {
      res.status(200).json(updatedUser);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });


//put to update a thought by its _id
router.post('/:id', async (req, res) =>{
  await Thought.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updatedThought) => res.json(updatedThought))
  .catch((err) => res.status(500).json(err));
});

//delete to remove a thought by its _id

router.delete("/:id", async (req, res) => {
  await Thought.findByIdAndDelete({ _id: req.params.id })
    .then((deletedThought) => res.json(deletedThought))
    .catch((err) => res.status(500).json(err));
});




//api/thoughts/:thoughtId/reactions

//post to create a reaction stored in a single thoughts reactions array field
router.post('/:thoughtId/reactions', async (req, res) =>{
  const reaction = await Thought.findByIdAndUpdate({_id: req.params.thoughtId}, {$addToSet: { reactions: req.body } }, {new: true}).select("-__v");
  if (res.status(200)) {
    res.status(200).json(reaction);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

//delete to pull and remove a reaction by the reactions reaction id value
router.delete('/:thoughtId/:reactionId', async (req, res) =>{
  const thought = await Thought.findByIdAndUpdate({_id: req.params.thoughtId}, {$pull: { reactions: {reactionId: req.params.reactionId }} }, {new: true}).select("-__v");
  if (res.status(200)) {
    res.status(200).json(thought);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});
module.exports = router;