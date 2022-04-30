const { Schema, model } = require("mongoose");

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
      validate: {
        validator: function(v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
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
  id: true,
  toJSON: {
    virtuals: true,
  },
}
);

const User = model('user', userSchema);

module.exports = User;
