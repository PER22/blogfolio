const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bio_string: { type: String, maxlength: 4000, default: "This user has not yet updated their Bio page." },
  profilePicture: { type: String, default: "https://i.imgur.com/oPhJfOu.jpeg" }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
