const Workout = require("../models/Workout");

// ADD WORKOUT
const addWorkout = async (req, res) => {
    try {
        const {
            workoutName,
            category,
            duration,
            caloriesBurned,
            workoutDate
        } = req.body;

        const workout = await Workout.create({
            user: req.user.userId,
            workoutName,
            category,
            duration,
            caloriesBurned,
            workoutDate
        });

        res.status(201).json({
            success: true,
            message: "Workout added successfully",
            workout
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL WORKOUTS
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({
            user: req.user.userId
        }).sort({
            workoutDate: -1
        });

        res.status(200).json({
            success: true,
            count: workouts.length,
            workouts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET WORKOUT BY ID
const getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            workout
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid workout ID"
        });
    }
};

// UPDATE WORKOUT
const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Workout updated successfully",
            workout
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE WORKOUT
const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Workout deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid workout ID"
        });
    }
};

// SEARCH WORKOUTS
const searchWorkouts = async (req, res) => {
    try {
        const { name, category, date } = req.query;

        const query = {
            user: req.user.userId
        };

        if (name) {
            query.workoutName = {
                $regex: name,
                $options: "i"
            };
        }

        if (category) {
            query.category = {
                $regex: category,
                $options: "i"
            };
        }

        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);

            endDate.setDate(endDate.getDate() + 1);

            query.workoutDate = {
                $gte: startDate,
                $lt: endDate
            };
        }

        const workouts = await Workout.find(query)
            .sort({
                workoutDate: -1
            });

        res.status(200).json({
            success: true,
            count: workouts.length,
            workouts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addWorkout,
    getAllWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    searchWorkouts
};