import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure only one combined file entry exists (e.g., combined.txt)
  },
  content: {
    type: String,
    required: true, // Store the combined text file content
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the file was first created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the file was last updated
  },
});

fileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const FileModel = mongoose.model('File', fileSchema);

export default FileModel;
