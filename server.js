require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const aiRoutes = require("./routes/aiRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to FitTrack AI API"
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FitTrack AI server is running"
    });
});

// API Routes
app.use("/api/auth", authRoutes);

app.use("/api/workouts", workoutRoutes);

app.use("/api/ai", aiRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`FitTrack AI server running on port ${PORT}`);
});