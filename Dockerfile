# ---------- Build stage ----------
FROM node:18-alpine AS build
WORKDIR /app

# 1. เอาข้อมูล dependency เข้าไปก่อน
COPY package*.json ./
RUN npm install

# 2. เอา "โค้ดทั้งหมด" เข้าไปใน image
COPY . .

# 3. build → ได้ไฟล์ static
RUN npm run build

# ---------- Run stage ----------
FROM node:18-alpine
WORKDIR /app

RUN npm install -g serve

# 4. เอาไฟล์ที่ build แล้ว เข้า image ตัวจริง
COPY --from=build /app/dist ./dist

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]