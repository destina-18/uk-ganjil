#!/bin/bash

BASE_URL="http://localhost:3000/api"
TOKEN=""

echo "========================================="
echo "UNIVERSITY SCHEDULING SYSTEM - API TEST"
echo "========================================="
echo ""

echo "1. LOGIN AS ADMIN"
echo "-----------------"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | tr -d '\n')
echo "$LOGIN_RESPONSE"
TOKEN=$(echo "$LOGIN_RESPONSE" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
echo ""

echo "2. CREATE DOSEN"
echo "---------------"
curl -s -X POST "$BASE_URL/dosen" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"nidn":1001,"nama_dosen":"Dr. Budi Santoso","jenis_kelamin":"L","alamat":"Jl. Sudirman No. 123"}'
echo ""

curl -s -X POST "$BASE_URL/dosen" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"nidn":1002,"nama_dosen":"Dr. Siti Aminah","jenis_kelamin":"P","alamat":"Jl. Thamrin No. 456"}'
echo ""

echo "3. GET ALL DOSEN"
echo "----------------"
curl -s -X GET "$BASE_URL/dosen" \
  -H "Authorization: Bearer $TOKEN"
echo ""

echo "4. CREATE MATAKULIAH"
echo "--------------------"
curl -s -X POST "$BASE_URL/matakuliah" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_matakuliah":101,"nama_matakuliah":"Basis Data","id_dosen":1001,"sks":3}'
echo ""

curl -s -X POST "$BASE_URL/matakuliah" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_matakuliah":102,"nama_matakuliah":"Algoritma","id_dosen":1001,"sks":4}'
echo ""

curl -s -X POST "$BASE_URL/matakuliah" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_matakuliah":103,"nama_matakuliah":"Web Programming","id_dosen":1002,"sks":3}'
echo ""

curl -s -X POST "$BASE_URL/matakuliah" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_matakuliah":104,"nama_matakuliah":"Sistem Operasi","id_dosen":1002,"sks":3}'
echo ""

curl -s -X POST "$BASE_URL/matakuliah" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_matakuliah":105,"nama_matakuliah":"Jaringan Komputer","id_dosen":1001,"sks":3}'
echo ""

echo "5. GET ALL MATAKULIAH"
echo "---------------------"
curl -s -X GET "$BASE_URL/matakuliah" \
  -H "Authorization: Bearer $TOKEN"
echo ""

echo "6. CREATE MAHASISWA"
echo "-------------------"
curl -s -X POST "$BASE_URL/mahasiswa" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"nim":"2024001","nama_mahasiswa":"Ahmad Rizki","jenis_kelamin":"L","jurusan":"Teknik Informatika"}'
echo ""

curl -s -X POST "$BASE_URL/mahasiswa" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"nim":"2024002","nama_mahasiswa":"Dewi Lestari","jenis_kelamin":"P","jurusan":"Sistem Informasi"}'
echo ""

echo "7. GET ALL MAHASISWA"
echo "--------------------"
curl -s -X GET "$BASE_URL/mahasiswa" \
  -H "Authorization: Bearer $TOKEN"
echo ""

echo "8. CREATE PENJADWALAN"
echo "---------------------"
curl -s -X POST "$BASE_URL/penjadwalan" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_dosen":1001,"id_matakuliah":101,"jadwal":"Senin, 08:00 - 10:00"}'
echo ""

curl -s -X POST "$BASE_URL/penjadwalan" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_dosen":1001,"id_matakuliah":102,"jadwal":"Selasa, 10:00 - 12:00"}'
echo ""

curl -s -X POST "$BASE_URL/penjadwalan" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_dosen":1002,"id_matakuliah":103,"jadwal":"Rabu, 13:00 - 15:00"}'
echo ""

curl -s -X POST "$BASE_URL/penjadwalan" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_dosen":1002,"id_matakuliah":104,"jadwal":"Kamis, 08:00 - 10:00"}'
echo ""

curl -s -X POST "$BASE_URL/penjadwalan" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"id_dosen":1001,"id_matakuliah":105,"jadwal":"Jumat, 10:00 - 12:00"}'
echo ""

echo "9. GET ALL PENJADWALAN"
echo "----------------------"
curl -s -X GET "$BASE_URL/penjadwalan" \
  -H "Authorization: Bearer $TOKEN"
echo ""

echo "10. LOGIN AS MAHASISWA"
echo "----------------------"
MAHASISWA_LOGIN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"2024001","password":"2024001"}' | tr -d '\n')
echo "$MAHASISWA_LOGIN"
MAHASISWA_TOKEN=$(echo "$MAHASISWA_LOGIN" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
echo ""

echo "11. PILIH MATAKULIAH (16 SKS)"
echo "------------------------------"
curl -s -X POST "$BASE_URL/mahasiswa/pilih-matakuliah" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MAHASISWA_TOKEN" \
  -d '{"mahasiswa_id":"2024001","matakuliah_ids":[101,102,103,104]}'
echo ""

echo "12. LIHAT JADWAL MAHASISWA"
echo "--------------------------"
curl -s -X POST "$BASE_URL/mahasiswa/jadwal" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MAHASISWA_TOKEN" \
  -d '{"mahasiswa_id":"2024001"}'
echo ""

echo "13. TEST VALIDATION - SKS KURANG DARI 15"
echo "-----------------------------------------"
curl -s -X POST "$BASE_URL/mahasiswa/pilih-matakuliah" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"mahasiswa_id":"2024002","matakuliah_ids":[101]}'
echo ""

echo "14. ANALISIS TOP MATAKULIAH & DOSEN"
echo "------------------------------------"
curl -s -X POST "$BASE_URL/analisis/top-matakuliah-dosen" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"limit":5}'
echo ""

echo "========================================="
echo "ALL TESTS COMPLETED!"
echo "========================================="
