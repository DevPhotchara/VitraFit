export const strength = { 
    id: "strength", 
    title: "STRENGTH", 
    description: "Build Muscle", 
    gradient: "from-blue-900 to-blue-700",
    sessions: [
      { 
        title: "Dumbell Workout", 
        duration: "10 min", 
        calories: 220, 
        level: "Intermediate",
        exercises: [
            { 
                name: "Jumping Jack",
                reps: 15,
                duration: 20,
                videoUrl: "/src/assets/videos/1.mp4",

              },
              { name: "Rest", duration: 20 },
            { 
                name: "Bent-over Dumbbell Hold",
                reps: 15,
                duration: 20,
                videoUrl: "/src/assets/videos/2.mp4",
              },
              { name: "Rest", duration: 20 },
            { 
                name: "Reverse Fly Motion",
                reps: 15,
                duration: 20,
                videoUrl: "/src/assets/videos/3.mp4",
              },
              { name: "Rest", duration: 20 },
            { 
                name: "Shoulder Press",
                reps: 15,
                duration: 30,
                videoUrl: "/src/assets/videos/4.mp4",
              },
              { name: "Rest", duration: 20 },
            { 
                name: "Star Press",
                reps: 15,
                duration: 10,
                videoUrl: "/src/assets/videos/5.mp4",
              },
              { name: "Rest", duration: 20 },
            ]
          },
    ]
  };