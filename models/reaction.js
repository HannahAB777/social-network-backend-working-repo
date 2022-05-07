const User = require('./users');
const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },

      reactionBody: {
        type: String,
        required: true,
        max_length: 280
      },
      userName:{
        type: String,
      },
      //userId: {
      //  type: Schema.Types.ObjectId,
      //  ref: 'user'
      //},
    createdAt: {
      type: Date,
      default: Date.now
    },
},
{
    toJSON: {
      virtuals: true,
    },
  }
);
  
//reactionSchema.virtual('userName').get(async function () {
//  // find one user
//  const userId = this.userId;
//
//  awaitUser.findOne({
//    _id: userId
//  });
//
//  // get the user name
//
//  return this.userId.userName;
//});
  //const Reaction = model('reaction', reactionSchema);
  
  module.exports = reactionSchema;