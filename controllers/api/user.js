const router = require("express").Router();
const User = require('../../models/users');
// Run npm install mongodb and require mongodb and MongoClient class
const db = require('../../config/connection');

//api.users 


//get all users
router.get('/', async (req, res) => {
    
try {
    const userData = await User.find({}).select("-__v");
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  

//get a single user by its _id and populated thoughts and data

router.get('/:id', async (req, res) => {
try {
    const oneUser = await User.findById({ id:req.params.id }).select("-__v");
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post a new user

//put to update a user by its id


//delete to remove a user by its _id


//bonus remove a users associated thoughts when deleted







//api/users/:userId/friends/:friendsId

//post to add a new friend to a users friends list

//delete to remove a friend from a users friend list

module.exports = router;