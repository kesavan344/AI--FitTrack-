const {
    generateWorkoutRecommendation,
    generateFitnessInsights
} = require("../services/geminiService");

// WORKOUT RECOMMENDATION
const workoutRecommendation = async (req, res) => {
    try {
        const {
            age,
            fitnessGoal,
            experienceLevel
        } = req.body;

        if (!age || !fitnessGoal || !experienceLevel) {
            return res.status(400).json({
                success: false,
                message:
                    "Age, fitness goal and experience level are required"
            });
        }

        const recommendation =
            await generateWorkoutRecommendation({
                age,
                fitnessGoal,
                experienceLevel
            });

        res.status(200).json({
            success: true,
            recommendation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate recommendation",
            error: error.message
        });
    }
};

// FITNESS INSIGHTS
const fitnessInsights = async (req, res) => {
    try {
        const {
            totalWorkouts,
            averageDuration,
            caloriesBurned
        } = req.body;

        if (
            totalWorkouts === undefined ||
            averageDuration === undefined ||
            caloriesBurned === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Total workouts, average duration and calories burned are required"
            });
        }

        const insights =
            await generateFitnessInsights({
                totalWorkouts,
                averageDuration,
                caloriesBurned
            });

        res.status(200).json({
            success: true,
            insights
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate fitness insights",
            error: error.message
        });
    }
};

module.exports = {
    workoutRecommendation,
    fitnessInsights
};