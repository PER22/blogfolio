const { json } = require('react-router-dom');
const Profile = require('../../models/profile');

module.exports = {
    allProfiles,
    getProfileById,
    updateProfile,
    deleteProfile
}

async function allProfiles(req, res){
  try{
      const profiles = await Profile.find();
      res.status(200).json(profiles)
  }catch(err){
      console.log(err)
      res.status(400).json(err)
  }
}

async function getProfileById(req, res){
    try{
        const profile = await Profile.findOne({_id: req.params.profileId});
        res.status(200).json(profile)
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

async function updateProfile(req, res) {
    try {
        const selectedProfile = await Profile.findOne({_id: req.params.profileId});
        console.log("selectedProfile.user: ", selectedProfile.user.toHexString());
        console.log("req.user._id: ", req.user._id);

        if (selectedProfile.user.toHexString() === req.user._id){
          const updatedProfile = await Profile.findOneAndUpdate(
            { _id: req.params.profileId},
            { bio_string: req.body.bio_string || "", profilePicture: req.body.profilePicture || "", github_link : req.body.github_link || "" },
          );
          res.status(200).json(updatedProfile);
        }else{
          res.status(403).json({ error: "You don't have edit access to that!" })
        }
        
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
}
  
async function deleteProfile(req, res) {
    try {
      let selectedProfile = await Profile.findOne({ _id: req.params.profileId});
      let 
      if(!selectedProfile){
        res.status(404).json({error: "Profile not found."});
        return;
      }
      if(selectedProfile.user._id === req.user._id){

        await Profile.findOneAndDelete({_id: req.params.profileId});
      }else{
        res.status(403).json({ error: "You don't have edit access to that." })
      }
      res.status(200).json({ message: 'Profile deleted.' });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
}



  