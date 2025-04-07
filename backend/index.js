
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const complaintRoutes = require("./routes/complaint");
const authRoutes = require("./routes/Auth");

dotenv.config(); // Load .env values

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Static folder for uploads
app.use("/uploads", express.static('uploads'));

// API Routes
app.use("/complaints", complaintRoutes);
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
