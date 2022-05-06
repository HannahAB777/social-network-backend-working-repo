const { Schema, model } = require("mongoose");

const validator = function(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);};


const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      max_length: 50,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      validate: [validator, "Invalid email address"],
      unique: true
    },
    thoughts:[ 
        {
      type: Schema.Types.ObjectId,
      ref: 'thought',
    }
  ],
    friends:[
         {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  ],
},
{  timestamps: true,
  id: false,
  toJSON: {
    virtuals: true,
  },
}
);

const User = model('user', userSchema);

module.exports = User;
