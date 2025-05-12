// get Profile Model 
const Profile = require('../models/Profile');
const User = require('../models/User');

// get list of profiles
const getProfiles = async (req, res) => {
    try {
        const profileList = await User.aggregate([
            {
                $lookup: {
                    from: "profiles",
                    localField: "profile",
                    foreignField: "_id",
                    as: "userProfile"
                }
            },
            {
                $unwind: "$userProfile"
            },
            {
                $project: {
                    _id: 0,
                    email: 1, 
                    name: "$userProfile.name",
                    gender: "$userProfile.gender",
                    age: "$userProfile.age",
                    mobile: "$userProfile.mobile",
                    address: "$userProfile.address"
                }
            }
        ]).limit(5);

        res.json(profileList);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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
        res.status(400).json({error: 'Error in fetching profile details'});
    }
}

// create a profile
const createProfile = async (req, res) => {
    try {
        const data = req.body;
        const userId = data.userId;

        // check user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // check profile existence
        if (user.profile) {
             return res.status(404).json({ error: 'Profile already created. Use PUT/PATCH API' });
        }
        
        // create New Profile
        const newProfile = new Profile(data);
        const savedProfile = await newProfile.save();  // uncommented to save profile
        
        // set profile ID in User
        await User.findByIdAndUpdate(userId, { profile: savedProfile._id });
        
        res.status(201).json(savedProfile);
    } catch (err) {
        console.log('Error in saving profile. Error: ' + err);
        res.status(400).json({ error: 'Invalid Data' });
    }
};

// update with overwrite
const putProfile = async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const data = req.body;
        const userId = data.userId;

        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            data,
            { 
                new: true,
                overwrite: true, 
                runValidators: true
            }
        );
        
        if (!updatedProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json(updatedProfile);
    } catch (err) {
        console.log('Error in updating profile. Error: ' + err);
        res.status(400).json({ error: 'Error in updating profile' });
    }
};

// update without overwrite
const patchProfile = async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const data = req.body;
        
        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId, 
            data, 
            {
                new: true, 
                overwrite: false,
                runValidators: true
            }
        );

        if(!updatedProfile) {
            return res.status(400).json({ error: 'Profile not found' });
        }

        res.json(updatedProfile);
    } catch (err) {
        console.log('Error in Updating Profile. Error: ' + err);
        res.status(400).json({ error: 'Error in updating profile' });
    }
};

// delete a profile
const deleteProfile = async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const deleted = await Profile.findByIdAndDelete(profileId);
        if (!deleted) {
            return res.status(400).json({ error: 'Invalid Profile Id' });
        }
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
};
