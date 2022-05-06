//const User = require('../models/users');
//const Thought = require('../models/thought');
//const Reaction = require('../models/reaction');
//const {faker} = require('@faker-js/faker');
//const connection = require('../config/connection');

//async function seedUsers(numbers){
//   
//    //await User.deleteMany();
//
//    const users = [];
//
//    for (let index = 0; index < numbers.length; index++) {
//        
//        const [firstName, lastName] = [faker.name.firstName(), faker.name.lastName()];
//
//        const created = await User.create({
//            userName: faker.internet.userName(firstName, lastName),
//            email: faker.internet.email(firstName, lastName),
//        }).then
//        users.push(created);
//    }
//        //await User.collection.insertMany(created);
//        //process.exit(0);
//    }
//
//connection.on('error', (err) => err);
//
//connection.once('open', async () => {
//  console.log('connected');
//    seedUsers(20);
//});
//async function seedThoughts(numbers){
//
//    await Thought.deleteMany();
//
//    const thoughts = [];
//
//    for (let index = 0; index < numbers.length; index++) {
//
//        const randomUser = (User.aggregate([{$sample : {size: 1}}])[0]);
//        
//    const created = await Thought.create({
//        thoughtText: faker.lorem.word(10),
//        userName: randomUser,
//    });
//    User.findByIdAndUpdate({},{"breed": "Great Dane"});
//    thoughts.push(created);
//    }
//
//}

//create user
//thoughts
//reactions

//const { create } = require("domain");
//const { userInfo } = require("os");
//
//userInfo.find().then((user)=>{
//    user.thoughts = [{(_id )}]
//    user.save();
//})

//module.exports = seedUsers;
//const mongoose = require('mongoose');
//
//const departmentSchema = new mongoose.Schema({
//  name: { type: String, required: true },
//  lastAccessed: { type: Date, default: Date.now },
//});
//
//const Department = mongoose.model('Department', departmentSchema);
//
//const handleError = (err) => console.error(err);
//
//// Will add data only if collection is empty to prevent duplicates
//// Note that two documents can have the same name value
//Department.find({}).exec((err, collection) => {
//  if (err) {
//    return handleError(err);
//  }
//  if (collection.length === 0) {
//    return Department.insertMany(
//      [
//        { name: 'Produce' },
//        { name: 'Dairy' },
//        { name: 'Meat' },
//        { name: 'Wine' },
//        { name: 'Wine' },
//        { name: 'Wine' },
//        { name: 'Flowers' },
//      ],
//      (insertError) =>
//        insertError ? handleError(insertError) : console.log('Inserted')
//    );
//  }
//  return console.log('Already populated');
//});
//
//module.exports = Department;