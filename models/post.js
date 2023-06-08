const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  article: {type: String, required: true},
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
