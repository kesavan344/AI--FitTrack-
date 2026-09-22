const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MODEL = "gemini-3.8-flash";

const generateWorkoutRecommendation = async ({
    age,
    fitnessGoal,
    experienceLevel
}) => {

    const prompt = `
You are a fitness recommendation assistant.

Create a safe and general workout recommendation.

User information:
Age: ${age}
Fitness Goal: ${fitnessGoal}
Experience Level: ${experienceLevel}

Provide:

1. Weekly workout plan
2. Suggested exercises
3. Training tips
4. Safety recommendations
5. Motivational guidance

Keep the response clear and practical.
Do not diagnose medical conditions.
`;

    const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt
    });

    return response.text;
};


const generateFitnessInsights = async ({
    totalWorkouts,
    averageDuration,
    caloriesBurned
}) => {

    const prompt = `
You are a fitness insights assistant.

Analyze these workout statistics:

Total Workouts: ${totalWorkouts}
Average Workout Duration: ${averageDuration} minutes
Total Calories Burned: ${caloriesBurned}

Provide:

1. Performance analysis
2. Improvement suggestions
3. Motivational advice
4. Fitness progress summary

Keep the response clear and practical.
Do not diagnose medical conditions.
`;

    const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt
    });

    return response.text;
};


module.exports = {
    generateWorkoutRecommendation,
    generateFitnessInsights
};