export const yoga = { 
      id: "yoga", 
      title: "YOGA", 
      description: "Mind & Body Balance", 
      gradient: "from-purple-900 to-purple-700",
      sessions: [
        { 
          title: "Morning Flow", 
          duration: "30 min", 
          calories: 150, 
          level: "Beginner",
          exercises: [
            {
              name: "Sun Salutation",
              sets: 3,
              reps: 5,
              duration: 120,
              description: "ท่าทักทายดวงอาทิตย์ เป็นท่าพื้นฐานของโยคะที่ช่วยอุ่นเครื่องทั้งร่างกาย",
              videoUrl: "/src/assets/videos/sun-salutation.mp4",
              tips: [
                "หายใจเข้าลึกๆ ตามจังหวะการเคลื่อนไหว",
                "เคลื่อนไหวอย่างช้าๆ และต่อเนื่อง",
                "รักษาสมดุลและควบคุมการเคลื่อนไหว"
              ]
            },
            {
              name: "Rest",
              duration: 30,
              description: "พักผ่อน หายใจเข้าลึกๆ"
            },
            {
              name: "Warrior Pose",
              duration: 60,
              description: "ท่านักรบ ช่วยเสริมสร้างความแข็งแรงของขาและกล้ามเนื้อแกน",
              tips: [
                "ยืดแขนออกตรงไปข้างหน้า",
                "งอเข่าข้างหน้า 90 องศา",
                "รักษาหลังตรง มองไปข้างหน้า"
              ]
            }
          ]
        },
        { 
          title: "Power Yoga", 
          duration: "45 min", 
          calories: 250, 
          level: "Intermediate",
          exercises: [
            {
              name: "Downward Dog",
              duration: 90,
              description: "ท่าหมาก้มหน้า ยืดกล้ามเนื้อขาและหลัง",
              tips: [
                "กดฝ่ามือและเท้าแนบพื้น",
                "ยกสะโพกสูง เป็นรูปสามเหลี่ยม",
                "ผ่อนคลายคอและศีรษะ"
              ]
            },
            {
              name: "Plank Hold",
              duration: 60,
              description: "ท่าแพลงค์ เสริมสร้างกล้ามเนื้อแกน",
              tips: [
                "หลังตรง ไม่ย้อย",
                "กระชับกล้ามเนื้อท้อง",
                "หายใจสม่ำเสมอ"
              ]
            }
          ]
        }
      ]
    }