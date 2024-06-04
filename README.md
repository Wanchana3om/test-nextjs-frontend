
## Test Project (Frontend)

Test Project เป็น Project เกี่ยวกับ Community ที่สามารถสร้าง Blog เพื่อ Post หรือ Comment ซึ่งทุกคนสามารถมาสนทนากันได้ โดยส่วนนี้จะเป็นส่วนของ Frontend โดย [Nextjs](https://nextjs.org/) framework 

##  Prerequisites

ในการพัฒนาครั้งนี้ใช้เป็น 
- react@18.2.0 
- react-dom@18.2.0
- Next.js v13.5.6
## Installation

 1. ขั้นตอนเเรกในการติดตั้ง Project ทำการโคลน Project จาก GitHub

```bash
$ git clone https://github.com/Wanchana3om/test-nextjs-frontend.git
```
```bash
$ cd test-nextjs-frontend
```
```bash
$ npm install
```

2. ทำการสร้างไฟล์ .env ขึ้นมาเเล้ว config ตามรูปด้านล่าง

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

 - config NEXT_PUBLIC_API_URL เพื่อใช้ในการส่ง request ไปหา api ฝั่ง backend ซึ่งใน backendใช้เป็น port 8000
 
3. ทำการ run project 
 ```bash
$ npm run dev
```

## Application Architecture 

ในส่วนของ Architecture

<img width="400" alt="Screenshot 2567-06-04 at 20 58 17" src="https://github.com/Wanchana3om/test-nextjs-frontend/assets/122344268/c7478a38-4276-4ef1-b70d-9f26f94ba594">


จากรูปข้างต้น จะมีการออกแบบ จะแยกเป็น
- โฟลเดอร์ auth ที่ภายในมี authcotext เป็น context ที่ใช้เป็น fuction กลาง
คอยเก็บข้อมูลหลังจากได้ token จาก backend มา แล้วยังมี fuction ในการตรวจสอบว่ามี token ใลระบบรึเปล่า หากไม่พบจะทำการ redirect ไปที่หน้า login   
- โฟลเดอร์ component จัดเก็บไฟล์ component
- hook จัดเก็บ ไฟล์ hook ต่างๆที่เรียกใช้
- interfaces จัดเก็บ interface ไฟล์ ใช้ในการระบุ type ที่ถูกต้องของ parameter
- นอกนั้นจะเป็น path floder ที่เรียกตาม path url

## Libraries/Packages

ในส่วนของ Libraries หรือ Packages ที่ใช้จะมี
```bash
 @mui/material
```
- element ใน project นี้จะใช้เป็น mui ทั้งหมด

```bash
  react-query
```
- มีการใช้ react-query เพื่อ get ข้อมูลซึ่งจะมี handle isLoading หรือ refetch มาให้ใช้ทำให้สะดวกในการทำการแล้วทำให้ web ดู smooth มากขึ้น

## Credit

 [Wanchana Inmasom](https://github.com/Wanchana3om) 
