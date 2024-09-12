// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./database/db.js";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from 'url';

// dotenv.config();

// const app = express();

// // Fix for __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // using middleware
// app.use(express.json());

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Importing routes
// import userRoutes from "./routes/userRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";

// // Using routes
// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Server is working on port ${process.env.PORT}`);
//   connectDb();
// });


import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
// app.use(cors({
//   origin: (origin, callback) => {
//     console.log('Origin:', origin);
//     console.log('Allowed origin:', process.env.CLIENT_URL);
//     if (!origin || origin === process.env.CLIENT_URL) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// }));

// // Preflight request handling
// app.options('*', cors());

app.use(cors());
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importing routes
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from './routes/adminRoutes.js'; // Import the route

// Using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);


// Error handling middleware (for debugging purposes)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is working on port ${process.env.PORT}`);
  connectDb();
});
