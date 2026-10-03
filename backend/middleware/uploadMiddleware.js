const multer = require('multer');
const path = require('path');

// Configure memory storage so buffer can be streamed to Cloudinary or disk
const storage = multer.memoryStorage();

// Allowed file extension regex
const ALLOWED_EXTENSIONS = /^\.(pdf|doc|docx|ppt|pptx|xls|xlsx|zip|jpg|jpeg|png)$/i;

// Dangerous executable extension regex
const PROHIBITED_EXTENSIONS = /^\.(exe|bat|cmd|sh|vbs|msi|jar|com|scr|pif|ps1|py|php|js)$/i;

// File Filter Function
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (PROHIBITED_EXTENSIONS.test(ext)) {
    return cb(new Error('Security Error: Executable and script files are strictly prohibited.'), false);
  }

  if (!ALLOWED_EXTENSIONS.test(ext)) {
    return cb(
      new Error(`Unsupported file type '${ext}'. Allowed formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, ZIP, JPG, JPEG, PNG`),
      false
    );
  }

  cb(null, true);
};

// Max File Size Limit (Default: 15 MB)
const maxFileSizeMB = parseInt(process.env.MAX_FILE_SIZE_MB || '15', 10);
const limits = {
  fileSize: maxFileSizeMB * 1024 * 1024
};

const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = upload;
