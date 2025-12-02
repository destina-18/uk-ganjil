# University Scheduling System API

RESTful API untuk sistem penjadwalan perkuliahan dengan JWT authentication.

## Quick Start

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Setup database
npm run db:push

# 3. Create admin user
npm run seed

# 4. Run server
npm run start:dev
```

Server: `http://localhost:3000`

**Default Admin:**
- Username: `admin`
- Password: `admin123`

---

## API Endpoints

### 1. Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "ADMIN"
  }
}
```

---

### 2. Dosen (Admin Only)

#### Create Dosen
```http
POST /api/dosen
Authorization: Bearer {token}
Content-Type: application/json

{
  "nidn": 1001,
  "nama_dosen": "Dr. Budi Santoso",
  "jenis_kelamin": "L",
  "alamat": "Jl. Sudirman No. 123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Dosen berhasil ditambahkan",
  "data": {
    "nidn": 1001,
    "nama_dosen": "Dr. Budi Santoso",
    "jenis_kelamin": "L",
    "alamat": "Jl. Sudirman No. 123"
  }
}
```

#### Get All Dosen
```http
GET /api/dosen
Authorization: Bearer {token}
```

**Response:**
```json
{
  "status": "success",
  "message": "Data dosen berhasil diambil",
  "data": [
    {
      "nidn": 1001,
      "nama_dosen": "Dr. Budi Santoso",
      "jenis_kelamin": "L",
      "alamat": "Jl. Sudirman No. 123"
    }
  ]
}
```

#### Update Dosen
```http
PUT /api/dosen/{nidn}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nama_dosen": "Prof. Dr. Budi Santoso"
}
```

#### Delete Dosen
```http
DELETE /api/dosen/{nidn}
Authorization: Bearer {token}
```

---

### 3. Matakuliah (Admin Only)

#### Create Matakuliah
```http
POST /api/matakuliah
Authorization: Bearer {token}
Content-Type: application/json

{
  "id_matakuliah": 101,
  "nama_matakuliah": "Basis Data",
  "id_dosen": 1001,
  "sks": 3
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Matakuliah berhasil ditambahkan",
  "data": {
    "id_matakuliah": 101,
    "nama_matakuliah": "Basis Data",
    "id_dosen": 1001,
    "sks": 3
  }
}
```

#### Get All Matakuliah
```http
GET /api/matakuliah
Authorization: Bearer {token}
```

#### Update Matakuliah
```http
PUT /api/matakuliah/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "sks": 4
}
```

#### Delete Matakuliah
```http
DELETE /api/matakuliah/{id}
Authorization: Bearer {token}
```

---

### 4. Mahasiswa (Admin Only)

#### Create Mahasiswa
```http
POST /api/mahasiswa
Authorization: Bearer {token}
Content-Type: application/json

{
  "nim": "2024001",
  "nama_mahasiswa": "Ahmad Rizki",
  "jenis_kelamin": "L",
  "jurusan": "Teknik Informatika"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "2024001",
    "nama_mahasiswa": "Ahmad Rizki",
    "jenis_kelamin": "L",
    "jurusan": "Teknik Informatika"
  }
}
```

**Note:** Mahasiswa otomatis mendapat akun login dengan username = NIM, password = NIM

#### Get All Mahasiswa
```http
GET /api/mahasiswa
Authorization: Bearer {token}
```

#### Update Mahasiswa
```http
PUT /api/mahasiswa/{nim}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nama_mahasiswa": "Ahmad Rizki Pratama"
}
```

#### Delete Mahasiswa
```http
DELETE /api/mahasiswa/{nim}
Authorization: Bearer {token}
```

---

### 5. Penjadwalan (Admin Only)

#### Create Penjadwalan
```http
POST /api/penjadwalan
Authorization: Bearer {token}
Content-Type: application/json

{
  "id_dosen": 1001,
  "id_matakuliah": 101,
  "jadwal": "Senin, 08:00 - 10:00"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Penjadwalan berhasil ditambahkan",
  "data": {
    "id": 1,
    "id_dosen": 1001,
    "id_matakuliah": 101,
    "jadwal": "Senin, 08:00 - 10:00"
  }
}
```

**Jadwal Format:** `"Hari, HH:MM - HH:MM"`  
**Valid Days:** Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu

#### Get All Penjadwalan
```http
GET /api/penjadwalan
Authorization: Bearer {token}
```

#### Get Penjadwalan by ID
```http
GET /api/penjadwalan/{id}
Authorization: Bearer {token}
```

#### Update Penjadwalan
```http
PUT /api/penjadwalan/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "jadwal": "Senin, 10:00 - 12:00"
}
```

#### Delete Penjadwalan
```http
DELETE /api/penjadwalan/{id}
Authorization: Bearer {token}
```

---

### 6. KRS - Mahasiswa Features

#### Pilih Matakuliah
```http
POST /api/mahasiswa/pilih-matakuliah
Authorization: Bearer {mahasiswa_token}
Content-Type: application/json

{
  "mahasiswa_id": "2024001",
  "matakuliah_ids": [101, 102, 103, 104]
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "Matakuliah berhasil dipilih",
  "data": {
    "mahasiswa_id": "2024001",
    "matakuliah_ids": [101, 102, 103, 104],
    "total_sks": 16
  }
}
```

**Response (Error - SKS < 15):**
```json
{
  "status": "error",
  "message": "Total SKS kurang dari 15",
  "data": null
}
```

**Response (Error - SKS > 23):**
```json
{
  "status": "error",
  "message": "Total SKS lebih dari 23",
  "data": null
}
```

**Response (Error - Jadwal Bentrok):**
```json
{
  "status": "error",
  "message": "Jadwal bentrok",
  "data": null
}
```

**Business Rules:**
- Total SKS: 15-23
- Automatic schedule conflict detection
- Prevents duplicate enrollment

#### Lihat Jadwal
```http
POST /api/mahasiswa/jadwal
Authorization: Bearer {mahasiswa_token}
Content-Type: application/json

{
  "mahasiswa_id": "2024001"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Jadwal berhasil diambil",
  "data": {
    "mahasiswa_id": "2024001",
    "jadwal": [
      {
        "id_matakuliah": 101,
        "nama_matakuliah": "Basis Data",
        "jadwal": "Senin, 08:00 - 10:00"
      },
      {
        "id_matakuliah": 102,
        "nama_matakuliah": "Algoritma",
        "jadwal": "Selasa, 10:00 - 12:00"
      }
    ]
  }
}
```

---

### 7. Analytics (Admin Only)

#### Top Matakuliah & Dosen
```http
POST /api/analisis/top-matakuliah-dosen
Authorization: Bearer {token}
Content-Type: application/json

{
  "tahun_ajaran": "2024/2025",
  "semester": 1,
  "limit": 5
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Analisis berhasil diambil",
  "data": {
    "top_matakuliah": [
      {
        "id_matakuliah": 101,
        "nama_matakuliah": "Basis Data",
        "total_mahasiswa_memilih": 25,
        "total_sks_diambil": 75
      }
    ],
    "top_dosen": [
      {
        "id_dosen": 1001,
        "nama_dosen": "Dr. Budi Santoso",
        "total_mahasiswa_memilih": 40,
        "total_matakuliah_diampu": 3
      }
    ]
  }
}
```

---

## Testing

### Automated Test

**Git Bash (Windows/Linux/Mac):**
```bash
./test-api.sh
```

**PowerShell (Windows):**
```powershell
.\test-api.ps1
```

### Manual Test Example
```bash
# 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 2. Create Dosen (replace {token})
curl -X POST http://localhost:3000/api/dosen \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"nidn":1001,"nama_dosen":"Dr. Budi","jenis_kelamin":"L","alamat":"Jakarta"}'

# 3. Get All Dosen
curl -X GET http://localhost:3000/api/dosen \
  -H "Authorization: Bearer {token}"
```

---

## Tech Stack

- **Framework:** NestJS 11
- **ORM:** Prisma 6.19
- **Database:** MySQL
- **Auth:** JWT + Passport
- **Validation:** class-validator

---

## Response Format

All endpoints return:
```json
{
  "status": "success" | "error",
  "message": "string",
  "data": {} | null
}
```
