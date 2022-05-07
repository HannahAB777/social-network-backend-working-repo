const User = require('./users');
const { Schema, model } = require("mongoose");
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      // getter method to get time stamp
      userName: {
          type: String,
      },
      reactions:[ 
          reactionSchema
    ],
},
{   timestamps: true,
    id: false,
    toJSON: {
      virtuals: true
    },
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
}); 
  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;