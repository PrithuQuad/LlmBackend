import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import FileModel from '../models/FileModel.js'; // Import your File model

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const masterFilePath = path.join('uploads', 'combined.txt');

// Admin file upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = path.join('uploads', req.file.filename);

  // Read the uploaded file and convert it to text
  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }

    // Append the text data to the combined text file
    fs.appendFile(masterFilePath, `\n${data}\n`, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error appending to master file' });
      }

      // Read the combined text file
      const combinedText = fs.readFileSync(masterFilePath, 'utf8');

      // Save combined text to the database
      const savedFile = await FileModel.findOneAndUpdate(
        { name: 'combined.txt' }, // Ensure that this saves as a single document in your DB
        { content: combinedText },
        { upsert: true, new: true }
      );

      res.json({
        message: 'File uploaded and content added to combined file',
        file: req.file,
        combinedFile: savedFile.content,
      });
    });
  });
});

export default router;
