-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MAHASISWA');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('L', 'P');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dosen" (
    "nidn" INTEGER NOT NULL,
    "nama_dosen" VARCHAR(255) NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "alamat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dosen_pkey" PRIMARY KEY ("nidn")
);

-- CreateTable
CREATE TABLE "mahasiswa" (
    "nim" VARCHAR(50) NOT NULL,
    "nama_mahasiswa" VARCHAR(255) NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "jurusan" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mahasiswa_pkey" PRIMARY KEY ("nim")
);

-- CreateTable
CREATE TABLE "matakuliah" (
    "id_matakuliah" INTEGER NOT NULL,
    "nama_matakuliah" VARCHAR(255) NOT NULL,
    "id_dosen" INTEGER NOT NULL,
    "sks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matakuliah_pkey" PRIMARY KEY ("id_matakuliah")
);

-- CreateTable
CREATE TABLE "penjadwalan" (
    "id" SERIAL NOT NULL,
    "id_dosen" INTEGER NOT NULL,
    "id_matakuliah" INTEGER NOT NULL,
    "jadwal" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penjadwalan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mahasiswa_matakuliah" (
    "id" SERIAL NOT NULL,
    "mahasiswa_nim" VARCHAR(50) NOT NULL,
    "id_matakuliah" INTEGER NOT NULL,
    "tahun_ajaran" VARCHAR(20),
    "semester" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mahasiswa_matakuliah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_userId_key" ON "mahasiswa"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "penjadwalan_id_matakuliah_key" ON "penjadwalan"("id_matakuliah");

-- CreateIndex
CREATE INDEX "mahasiswa_matakuliah_mahasiswa_nim_idx" ON "mahasiswa_matakuliah"("mahasiswa_nim");

-- CreateIndex
CREATE INDEX "mahasiswa_matakuliah_id_matakuliah_idx" ON "mahasiswa_matakuliah"("id_matakuliah");

-- CreateIndex
CREATE INDEX "mahasiswa_matakuliah_tahun_ajaran_semester_idx" ON "mahasiswa_matakuliah"("tahun_ajaran", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_matakuliah_mahasiswa_nim_id_matakuliah_key" ON "mahasiswa_matakuliah"("mahasiswa_nim", "id_matakuliah");

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matakuliah" ADD CONSTRAINT "matakuliah_id_dosen_fkey" FOREIGN KEY ("id_dosen") REFERENCES "dosen"("nidn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penjadwalan" ADD CONSTRAINT "penjadwalan_id_dosen_fkey" FOREIGN KEY ("id_dosen") REFERENCES "dosen"("nidn") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penjadwalan" ADD CONSTRAINT "penjadwalan_id_matakuliah_fkey" FOREIGN KEY ("id_matakuliah") REFERENCES "matakuliah"("id_matakuliah") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mahasiswa_matakuliah" ADD CONSTRAINT "mahasiswa_matakuliah_mahasiswa_nim_fkey" FOREIGN KEY ("mahasiswa_nim") REFERENCES "mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mahasiswa_matakuliah" ADD CONSTRAINT "mahasiswa_matakuliah_id_matakuliah_fkey" FOREIGN KEY ("id_matakuliah") REFERENCES "matakuliah"("id_matakuliah") ON DELETE CASCADE ON UPDATE CASCADE;
