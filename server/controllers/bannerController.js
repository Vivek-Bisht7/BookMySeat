const Banner = require("../models/bannerModel");
const cloudinary = require("../config/cloudinary");

const addBanners = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    const existingCount = await Banner.countDocuments();
    const filesToUpload = Object.values(req.files).flat(); 

    if (existingCount + filesToUpload.length > 5) {
      return res.status(400).json({ 
        message: `Limit exceeded. You can only add ${5 - existingCount} more banner(s).` 
      });
    }

    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            folder: "bookmyseat/banners",
            resource_type: "image" 
          },
          (error, result) => {
            if (error) reject(error);
            else resolve({ url: result.secure_url, publicId: result.public_id });
          }
        );
        stream.end(file.buffer);
      });
    };

    const uploadResults = await Promise.all(filesToUpload.map(uploadToCloudinary));

    try {
      const bannerDocs = uploadResults.map(res => ({ 
        imageUrl: res.url,
        publicId: res.publicId 
      }));

      const banners = await Banner.insertMany(bannerDocs);
      
      return res.status(201).json({ 
        message: "Banners added successfully", 
        count: banners.length,
        banners 
      });

    } catch (dbError) {
      console.error("DB Save failed, cleaning up Cloudinary images...");
      const publicIds = uploadResults.map(res => res.publicId);
      await cloudinary.api.delete_resources(publicIds);
      
      throw dbError; 
    }

  } catch (err) {
    console.error("Banner Upload Error:", err);
    res.status(500).json({ 
      message: "Server error during banner upload", 
      error: err.message 
    });
  }
};

const deleteAllBanners = async (req, res) => {
  try {
    await Banner.deleteMany({});
    res.status(200).json({ message: "All banners deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(banners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBanners ,deleteAllBanners , getAllBanners};