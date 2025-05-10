// get Profile Model 
const Profile = require('../models/Profile');
const User = require('../models/User');

// get list of profiles
const getProfiles = async (req, res) => {
    const profileList = await Profile.find().limit(5);
    res.json(profileList);
};

// get a profile details 
const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.profileId);
        if (!profile) {
            return res.status(404).json({message: 'Profile not found'});
        }
        res.json(profile);
    } catch (err) {
        console.log('Error in fetch profile details. Error: ' + err);
        res.status(400).json({erorr: 'Error in fetching profile details'});
    }
}

// create an profile
const createProfile = async (req, res) => {
    try {
        const data = req.body;
        const userId = data.userId;

        // check user existance
        const user = await User.findById(userId);
        if (!user) {
            // If user does not exist, return a 404 error
            return res.status(404).json({ error: 'User not found' });
        }
        
        // check profile existance
        const existingProfile = await Profile.findOne({ userId: userId });
        if (existingProfile) {
            // If profile exists, return a message and don't create a new one
            return res.status(400).json({ error: 'Profile already exists for this user' });
        }

        const newProfile = new Profile(data);
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
        // 201 => status for 'created' 
    } catch (err) {
        console.log('Error in saving profile. Error: ' + err);
        res.status(400).json({error:'Invalid Data'}); 
        // 400 => status for 'bad request'
    }
};

// update with overwrite 
const putProfile = async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const data = req.body;
        const userId = data.userId;
        
        // check user existance
        const user = await User.findById(userId);
        if (!user) {
            // If user does not exist, return a 404 error
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            data,
            { 
                new: true, // to get updated profile in the updatedProfile variable
                overwrite: true, // for PUT request this should be true 
                runValidators: true
            }
        );
        
        if (!updatedProfile) {
            return res.status(404).json({error: 'Profile not found'});
        }

        res.json(updatedProfile);
    } catch (err) {
        console.log('Error in updating profile. Error: ' + err);
        res.status(400).json({error: 'Unable to store the data'});
    }
};

// update with out overwrite 
const patchProfile = async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const data = req.body;
        const userId = data.userId;

        // check user existance
        const user = await User.findById(userId);
        if (!user) {
            // If user does not exist, return a 404 error
            return res.status(404).json({ error: 'User not found' });
        }
        
        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId, 
            data, 
            {
                new: true, // return updated profile
                overwrite: false, // For PUT this should be false
                runValidators: true
            }
        );
        if(!updatedProfile)
            return res.status(400).json({error: 'Profile not found'});
        res.json(updatedProfile);
    } catch (err) {
        console.log('Error in Updating Profile. Error: ' + err);
        res.status(400).json({error: 'Error in Updating Profile'});
    }
};

// delete a profile
const deleteProfile = async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const deleted = await Profile.findByIdAndDelete(profileId);
        if (!deleted) 
            return res.status(400).json({error: 'Invalid Profile Id'});
        res.json(deleted);
    } catch (err) {
        console.log('Error in deleting profile. Error: ' + err);
        res.status(400).json({ error: 'Unable to delete the profile' });
    }
};

module.exports = {
    getProfiles,
    getProfileById,
    createProfile,
    putProfile,
    patchProfile,
    deleteProfile
}
