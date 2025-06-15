// get Profile Model
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const User = require('../models/User');

// get list of profiles
const getProfiles = async (req, res) => {
  try {
    const profileList = await User.aggregate([
      {
        $lookup: {
          from: 'profiles',
          localField: 'profile',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      {
        $unwind: '$userProfile',
      },
      {
        $project: {
          _id: 0,
          email: 1,
          name: '$userProfile.name',
          gender: '$userProfile.gender',
          age: '$userProfile.age',
          mobile: '$userProfile.mobile',
          address: '$userProfile.address',
        },
      },
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
    // Check userId
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }

    // convert the userId to ObjectId
    const objectId = mongoose.Types.ObjectId.createFromHexString(userId);

    // populate profile
    // const user = await User.findById(userId).populate('profile');
    const user = await User.aggregate([
      {
        $match: {
          _id: objectId,
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'profile',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      {
        $unwind: '$userProfile',
      },
      {
        $project: {
          _id: 0,
          email: 1,
          name: '$userProfile.name',
          namedEmail: 1,
          gender: '$userProfile.gender',
          age: '$userProfile.age',
          mobile: '$userProfile.mobile',
          address: '$userProfile.address',
        },
      },
    ]);

    if (!user) {
      return res.status(404).json({ message: 'Associated User not found' });
    }

    res.json(user);
  } catch (err) {
    console.log('Error in fetch profile details. Error: ' + err);
    res.status(400).json({ error: 'Error in fetching profile details' });
  }
};

// create a profile
const createProfile = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    // check user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // check profile existence
    if (user.profile) {
      return res
        .status(404)
        .json({ error: 'Profile already created. Use PUT/PATCH API' });
    }

    // create New Profile
    const newProfile = new Profile(data);
    const savedProfile = await newProfile.save(); // uncommented to save profile
    // set profile ID in User
    await User.findByIdAndUpdate(userId, { profile: savedProfile._id });

    res.status(201).json({ profileId: savedProfile._id });
  } catch (err) {
    console.log('Error in saving profile. Error: ' + err);
    res.status(400).json({ error: 'Invalid Data' });
  }
};

// update with overwrite
const putProfile = async (req, res) => {
  try {
    const data = req.body;

    // Check user
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User Not Found' });
    }

    // Check profile
    const profileId = user.profile;
    const updatedProfile = await Profile.findByIdAndUpdate(profileId, data, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile patched successfully' });
  } catch (err) {
    console.log('Error in updating profile. Error: ' + err);
    res.status(400).json({ error: 'Error in updating profile' });
  }
};

// update without overwrite
const patchProfile = async (req, res) => {
  try {
    const data = req.body;

    // Check user
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User Not Found' });
    }

    // Check profile
    const profileId = user.profile;
    const updatedProfile = await Profile.findByIdAndUpdate(profileId, data, {
      new: true,
      overwrite: false,
      runValidators: true,
    });

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile updated sucessfully' });
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
  deleteProfile,
};
