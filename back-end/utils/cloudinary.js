import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

// Cloudinary upload image
const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: 'auto',
    })
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Internal server Error (cloudinary)");
  }
}


// Cloudinary remove image
const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("Internal server Error (cloudinary)");
  }
}

const cloudinaryRemoveImages = async (publicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.log(err);
    throw new Error("Internal server Error (cloudinary)");
  }
}

export { cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveImages };