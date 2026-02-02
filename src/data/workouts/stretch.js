export const stretch = { 
    id: "stretch", 
    title: "STRETCH", 
    description: "Flexibility Training", 
    gradient: "from-pink-900 to-pink-700",
    sessions: [
      { 
        title: "Full Body Stretch", 
        duration: "25 min", 
        calories: 80, 
        level: "Beginner",
        exercises: [
          {
            name: "Neck Rolls",
            duration: 60,
            description: "หมุนคอเบาๆ เพื่อคลายความตึงของกล้ามเนื้อคอ",
            tips: [
              "หมุนช้าๆ ไม่รีบเร่ง",
              "หายใจเข้าออกสม่ำเสมอ",
              "หมุนทั้งสองทิศทาง"
            ]
          },
          {
            name: "Shoulder Stretch",
            duration: 90,
            description: "ยืดกล้ามเนื้อไหล่ ช่วยคลายความเมื่อยล้า",
            tips: [
              "ดึงแขนข้ามอก",
              "กดเบาๆ ที่ข้อศอก",
              "รักษาไหล่ผ่อนคลาย"
            ]
          }
        ]
      },
      { 
        title: "Deep Stretch", 
        duration: "40 min", 
        calories: 120, 
        level: "Intermediate",
        exercises: [
          {
            name: "Pigeon Pose",
            duration: 120,
            description: "ท่านกพิราบ ยืดกล้ามเนื้อสะโพกลึก",
            tips: [
              "วางขาหน้างอ",
              "เอนตัวลงช้าๆ",
              "หายใจเข้าลึกๆ"
            ]
          },
          {
            name: "Butterfly Stretch",
            duration: 90,
            description: "ท่าผีเสื้อ ยืดขาด้านใน",
            tips: [
              "ชนฝ่าเท้าเข้าหากัน",
              "กดเข่าลงเบาๆ",
              "หลังตรง"
            ]
          }
        ]
      }
    ]
  };