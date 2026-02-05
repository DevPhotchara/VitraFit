export const bodyweight = {
  id: "bodyweight",
  title: "BODYWEIGHT",
  description: "No Equipment Needed",
  gradient: "from-blue-900 to-blue-700",
  sessions: [
    {
      title: "Bodyweight Circuit",
      duration: "15 min",
      calories: 200,
      level: "Beginner",
      exercises: [
        {
          name: "Squat",
          key: "squat",
          description: "ท่าสควอท ฝึกกล้ามเนื้อขาและสะโพก",
          tips: ["หลังตรง", "เข่าห้ามเลยปลายเท้า"],
          reps: 15,
          sets: 3,
          icon: "🦵"
        },
       
        {
          name: "Lunge",
          key: "lunge",
          description: "ท่าลันจ์ ฝึกกล้ามเนื้อขาและสะโพก",
          tips: ["หลังตรง", "เข่าห้ามเลยปลายเท้า"],
          reps: 12,
          sets: 3,
          icon: "🦵"
        },
        {
          name: "Plank",
          key: "plank",
          description: "ท่าแพลงก์ ฝึกกล้ามเนื้อแกนกลางลำตัว",
          tips: ["ลำตัวตรง", "เกร็งหน้าท้อง"],
          reps: 1,
          sets: 3,
          duration: 30,
          icon: "🧘"
        },
        
        {
          name: "Jumping Jack",
          key: "jumpingjack",
          description: "ท่ากระโดดตบ เพิ่มความแข็งแรงและความฟิต",
          tips: ["มือและเท้าต้องขึ้นลงพร้อมกัน"],
          reps: 20,
          sets: 3,
          icon: "🏃"
        }
      ]
    }
  ]
};
