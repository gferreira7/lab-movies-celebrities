//  Add your code here

const { Schema, model } = require('mongoose')

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchphrase: String,

    // posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    timestamps: true,
  }
)

const Celebrity = model('Celebrity', celebritySchema)

module.exports = Celebrity
