const Profile = require('../../models/profile');

module.exports = {
    detail,
    update,
    deleteProfile
}

async function detail(req, res){
    try{
        const profile = await Profile.findOne({user:req.user._id});
        res.status(200).json(profile)
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}
async function update(req, res) {
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { bio_string: req.body.bio_string || "", profilePicture: req.body.profilePicture || "" },
          );
        res.status(200).json(updatedProfile);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
  
async function deleteProfile(req, res) {
    try {
      await Profile.findOneAndRemove({ user: req.user._id });
      res.status(200).json({ message: 'Profile deleted' });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
  