const User = require('./users');
const { Schema, model } = require("mongoose");
const reactionSchema = require('./reaction');
const moment = require("moment");

function currentDateTime(date){
  moment(date).format('MMMM Do YYYY, h:mm:ss a');
};

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
        default: Date.now,
        get: currentDateTime
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
    getters: true,
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