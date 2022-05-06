const router = require("express").Router();
const Thought = require("../../models/thought");
const User = require('../../models/users');
const Reaction = require("../../models/reaction");
const db = require("../../config/connection");


//api/thoughts


//get to get all thoughts

//get to get a single thought by its _id

//post to create a new thought (dont forget to push the created thoughts _id to the associated users thoughts array field)

router.post("/", async (req, res) => {
    Thought.create(req.body)
    .then((Thought) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { Thoughts: Thought._id } },
        { new: true }
      );
    })
    .then((User) =>
      !User
        ? res.status(404).json({
            message: 'Video created, but found no user with that ID',
          })
        : res.json('Created the video 🎉')
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });


//put to update a thought by its _id

//delete to remove a thought by its _id






//api/thoughts/:thoughtId/reactions

//post to create a reaction stored in a single thoughts reactions array field

//delete to pull and remove a reaction by the reactions reaction id value

module.exports = router;