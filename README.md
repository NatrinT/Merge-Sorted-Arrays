# Merge Sorted Arrays (TypeScript)

โปรเจกต์ TypeScript สำหรับ merge array 3 ชุดเข้าด้วยกัน โดยผลลัพธ์เรียงจากน้อยไปมาก **ห้ามใช้ฟังก์ชัน sort ใดๆ**

## โจทย์

```ts
merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[]
```

**เงื่อนไข input:**
- `collection_1` เรียงน้อย → มาก
- `collection_2` เรียงมาก → น้อย
- `collection_3` เรียงน้อย → มาก

**ผลลัพธ์:** array เดียวเรียงน้อย → มาก

## แนวคิดอัลกอริทึม

ใช้เทคนิค **Three-Pointer Merge** (คล้าย merge step ของ Merge Sort):

| Collection | ทิศทางอ่าน | เริ่มที่ |
|---|---|---|
| `collection_1` (asc) | ซ้าย → ขวา | index `0` |
| `collection_2` (desc) | ขวา → ซ้าย | index `n2 - 1` |
| `collection_3` (asc) | ซ้าย → ขวา | index `0` |

ทุกรอบเปรียบเทียบค่าตรง pointer ทั้ง 3 ตัว เลือกตัวที่น้อยที่สุดใส่ result แล้วเลื่อน pointer ของตัวนั้น

- **Time complexity:** O(n₁ + n₂ + n₃)
- **Space complexity:** O(n₁ + n₂ + n₃) สำหรับ result array
- **ไม่ใช้** `.sort()`, `Array.prototype.sort()`, หรือ library ใดๆ ที่ทำการเรียงข้อมูล

## โครงสร้างโปรเจกต์

```
merge-sorted-arrays/
├── src/
│   ├── merge.ts          # ฟังก์ชันหลัก
│   └── index.ts          # ตัวอย่างการใช้งาน
├── tests/
│   └── merge.test.ts     # unit tests
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## วิธีติดตั้งและรันโปรเจกต์ตั้งแต่เริ่มต้น

### 1. ความต้องการของระบบ (Prerequisites)

- **Node.js** version 18 ขึ้นไป ([download](https://nodejs.org/))
- **npm** (มาพร้อม Node.js) หรือใช้ `pnpm` / `yarn` ก็ได้

ตรวจสอบเวอร์ชัน:
```bash
node --version
npm --version
```

### 2. Clone หรือสร้างโปรเจกต์

```bash
# ถ้า clone จาก repo
git clone [<your-repo-url>](https://github.com/NatrinT/Merge-Sorted-Arrays.git)
cd merge-sorted-arrays

# หรือถ้าสร้างเอง ให้คัดลอกไฟล์ทั้งหมดในโปรเจกต์นี้
```

### 3. ติดตั้ง dependencies

```bash
npm install
```

คำสั่งนี้จะติดตั้ง:
- `typescript` — TypeScript compiler
- `ts-node` — รัน `.ts` ได้ตรงๆ ไม่ต้อง build ก่อน
- `jest` + `ts-jest` + `@types/jest` — testing framework
- `@types/node` — type definitions ของ Node.js

### 4. รันโค้ดตัวอย่าง

```bash
npm start
```

ผลลัพธ์ที่คาดหวัง:
```
collection_1 (asc): [ 1, 4, 7, 10 ]
collection_2 (desc): [ 9, 6, 3, 0 ]
collection_3 (asc): [ 2, 5, 8, 11 ]
merged (asc): [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
```

### 5. รัน unit test

```bash
# รัน test ทั้งหมด
npm test

# รัน test แบบ watch mode (auto re-run เวลาแก้โค้ด)
npm run test:watch

# รัน test พร้อมดู coverage report
npm run test:coverage
```

### 6. Build เป็น JavaScript (optional)

```bash
npm run build
```

ไฟล์ที่ compile แล้วจะอยู่ใน `dist/`

## รายละเอียด Test Cases

มี 18 test cases ครอบคลุม:
- **Basic cases** — กรณีปกติตามโจทย์
- **Empty arrays** — array ว่าง 1, 2, หรือทั้ง 3 ตัว
- **Duplicates** — ค่าซ้ำทั้งใน/ระหว่าง collection
- **Value ranges** — เริ่มที่ 0, single element, ขนาดต่างกันมาก
- **Disjoint ranges** — ค่าไม่ซ้อนทับกันเลย
- **Stress test** — array ขนาด 3,000 elements

## ตัวอย่างการใช้งานในโค้ด

```ts
import { merge } from './src/merge';

const c1 = [1, 4, 7, 10];     // ascending
const c2 = [9, 6, 3, 0];      // descending
const c3 = [2, 5, 8, 11];     // ascending

const result = merge(c1, c2, c3);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```
