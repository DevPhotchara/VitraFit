export const cardio = { 
    id: "cardio", 
    title: "CARDIO", 
    description: "Heart Rate Boost", 
    gradient: "from-red-900 to-red-700",
    sessions: [
      { 
        title: "Running Intervals", 
        duration: "30 min", 
        calories: 400, 
        level: "Advanced",
        exercises: [
          {
            name: "Warm Up Jog",
            duration: 180,
            description: "วิ่งอุ่นเครื่อง เตรียมร่างกาย",
            tips: [
              "วิ่งช้าๆ สบายๆ",
              "หายใจลึก",
              "ผ่อนคลายไหล่"
            ]
          },
          {
            name: "Sprint Interval",
            sets: 5,
            reps: 1,
            duration: 180,
            description: "วิ่งเร็วสุดความสามารถ 30 วินาที พัก 30 วินาที",
            tips: [
              "วิ่งเต็มที่ 30 วินาที",
              "พัก 30 วินาที",
              "ทำ 5 รอบ"
            ]
          }
        ]
      },
      { 
        title: "Jump Rope Circuit", 
        duration: "20 min", 
        calories: 300, 
        level: "Intermediate",
        exercises: [
          {
            name: "Basic Jump",
            duration: 120,
            description: "กระโดดเชือกแบบพื้นฐาน",
            tips: [
              "กระโดดเบาๆ ใช้ข้อเท้า",
              "มือหมุนจากข้อมือ",
              "รักษาจังหวะสม่ำเสมอ"
            ]
          },
          {
            name: "High Knees Jump",
            duration: 90,
            description: "กระโดดยกเข่าสูง",
            tips: [
              "ยกเข่าสูงสุด",
              "เร็วแต่ควบคุม",
              "กระชับกล้ามเนื้อท้อง"
            ]
          }
        ]
      }
    ]
  };