const User = require("../models/userModel");

const searchUser = async (req, res) => {
  try {
    const { userEmail } = req.params;

    if(!userEmail) return res.status(400).json({success:false,message:"User Email is required"});

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
    
  } catch (error) {
    return next(error);
  }
};

module.exports = { searchUser };
