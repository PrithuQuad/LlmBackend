// import axios from 'axios';

// const handleFileUpload = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const response = await axios.post('http://localhost:5000/api/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${yourAuthToken}`, // Include your token if needed
//       },
//     });
//     console.log('File uploaded successfully:', response.data);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// };

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;

// import multer from 'multer';
// import path from 'path';

// // Define storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Ensure the 'uploads/' directory exists
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     // Use a timestamp to ensure unique filenames
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Define file filter for allowed file types
// const fileFilter = (req, file, cb) => {
//   // Allowed file types
//   const allowedTypes = /jpg|jpeg|png|gif|pdf|docx|xlsx/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, PDF, DOCX, and XLSX are allowed.'));
//   }
// };

// // Create multer instance with configuration
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10 MB
// });

// // Export the upload middleware
// export default upload;

