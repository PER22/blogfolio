const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "https://example.com/default-image.jpg" },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  stars: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  numStars: {type: Number, default:0}
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);