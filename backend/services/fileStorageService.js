const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary if credentials present
if (process.env.FILE_STORAGE_CLOUD_NAME && process.env.FILE_STORAGE_CLOUD_NAME !== 'your_cloud_name') {
  cloudinary.config({
    cloud_name: process.env.FILE_STORAGE_CLOUD_NAME,
    api_key: process.env.FILE_STORAGE_API_KEY,
    api_secret: process.env.FILE_STORAGE_API_SECRET
  });
}

/**
 * Uploads a file to cloud storage service (Cloudinary) or local disk fallback
 * @param {Object} file - Multer file object
 * @returns {Promise<Object>} File metadata including fileUrl, fileName, fileSize, publicId
 */
const uploadFile = async (file) => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  const isCloudinaryConfigured =
    process.env.FILE_STORAGE_CLOUD_NAME &&
    process.env.FILE_STORAGE_CLOUD_NAME !== 'your_cloud_name' &&
    process.env.FILE_STORAGE_CLOUD_NAME !== 'demo_cloud';

  // Strategy A: Cloudinary Storage
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'campusconnect_submissions',
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary Upload Error:', error);
            return reject(new Error(`Cloud file upload failed: ${error.message}`));
          }
          resolve({
            fileUrl: result.secure_url,
            publicId: result.public_id,
            fileName: file.originalname,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            mimeType: file.mimetype,
            storageProvider: 'Cloudinary'
          });
        }
      );
      uploadStream.end(file.buffer);
    });
  }

  // Strategy B: Local Disk Fallback Storage (Development Mode)
  const uploadsDir = path.join(__dirname, '..', 'uploads', 'submissions');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const cleanExt = path.extname(file.originalname).toLowerCase();
  const safeFilename = `submission-${uniqueSuffix}${cleanExt}`;
  const filePath = path.join(uploadsDir, safeFilename);

  // Write file buffer to local disk
  fs.writeFileSync(filePath, file.buffer || file.path);

  const serverHost = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
  const fileUrl = `${serverHost}/uploads/submissions/${safeFilename}`;

  return {
    fileUrl,
    publicId: safeFilename,
    fileName: file.originalname,
    fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    mimeType: file.mimetype,
    storageProvider: 'LocalDisk'
  };
};

/**
 * Deletes a file from cloud storage or local disk
 * @param {string} publicId - Storage identifier
 */
const deleteFile = async (publicId) => {
  if (!publicId) return false;

  const isCloudinaryConfigured =
    process.env.FILE_STORAGE_CLOUD_NAME &&
    process.env.FILE_STORAGE_CLOUD_NAME !== 'your_cloud_name' &&
    process.env.FILE_STORAGE_CLOUD_NAME !== 'demo_cloud';

  if (isCloudinaryConfigured) {
    try {
      await cloudinary.uploader.destroy(publicId);
      return true;
    } catch (err) {
      console.warn(`⚠️ Cloudinary delete warning: ${err.message}`);
      return false;
    }
  }

  // Local disk delete
  try {
    const filePath = path.join(__dirname, '..', 'uploads', 'submissions', publicId);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return true;
  } catch (err) {
    console.warn(`⚠️ Local file delete warning: ${err.message}`);
    return false;
  }
};

module.exports = {
  uploadFile,
  deleteFile
};
