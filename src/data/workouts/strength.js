export const strength = {
  id: "strength",
  title: "STRENGTH",
  description: "Build Muscle",
  gradient: "from-blue-900 to-blue-700",

  sessions: [
    {
      title: "Dumbbell Workout",
      duration: "10 min",
      calories: 220,
      level: "Intermediate",

      exercises: [
        {
          name: "Jumping Jack",
          reps: 15,
          duration: 20,
          videoUrl: "/videos/1.mp4",
          type: "exercise",
        },
        { name: "Rest", duration: 20, type: "rest" },

        {
          name: "Bent-over Dumbbell Hold",
          reps: 15,
          duration: 20,
          videoUrl: "/videos/2.mp4",
          type: "exercise",
        },
        { name: "Rest", duration: 20, type: "rest" },

        {
          name: "Reverse Fly Motion",
          reps: 15,
          duration: 20,
          videoUrl: "/videos/3.mp4",
          type: "exercise",
        },
        { name: "Rest", duration: 20, type: "rest" },

        {
          name: "Shoulder Press",
          reps: 15,
          duration: 30,
          videoUrl: "/videos/4.mp4",
          type: "exercise",
        },
        { name: "Rest", duration: 20, type: "rest" },

        {
          name: "Star Press",
          reps: 15,
          duration: 10,
          videoUrl: "/videos/5.mp4",
          type: "exercise",
        },
        { name: "Rest", duration: 20, type: "rest" },
      ],
    },
  ],
};
