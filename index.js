import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';


// Initialize dotenv
dotenv.config();

const app = express();
 
console.log('44444444444');

// Add a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/api/auth', authRoutes);