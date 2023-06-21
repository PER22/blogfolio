const Profile = require('../../models/profile');

module.exports = {
    detail,
    update,
    deleteProfile
}

async function detail(req, res){
    try{
        const profile = await Profile.findOne({_id:req.params.profileId});
        res.status(200).json(profile)
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

async function update(req, res) {
    try {
        const selectedProfile = await Profile.findOne({_id: req.params.profileId});
        if (selectedProfile.user._id === req.user._id){
          const updatedProfile = await Profile.findOneAndUpdate(
            { _id: req.params.profileId},
            { bio_string: req.body.bio_string || "", profilePicture: req.body.profilePicture || "" },
          );
          res.status(200).json(updatedProfile);
        }else{
          throw new Error("You don't have edit access to that!");
        }
        
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
}
  
async function deleteProfile(req, res) {
    try {
      
      let selectedProfile = await Profile.findOne({ _id: req.params.profileId });
      if(selectedProfile.user._id === req.user._id){
        await Profile.findOneAndDelete({_id: req.params.profileId})
      }else{
        throw new Error("You aren't able to delete that!")
      }
      res.status(200).json({ message: 'Profile deleted' });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
}
  