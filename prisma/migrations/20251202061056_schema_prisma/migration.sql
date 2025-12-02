/*
  Warnings:

  - You are about to drop the column `nama` on the `dosen` table. All the data in the column will be lost.
  - You are about to drop the column `noTelp` on the `dosen` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `dosen` table. All the data in the column will be lost.
  - You are about to alter the column `nidn` on the `dosen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `angkatan` on the `mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the column `kodeMk` on the `matakuliah` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `matakuliah` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `jadwalkuliah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mahasiswamatakuliah` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alamat` to the `Dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kelamin` to the `Dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_dosen` to the `Dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jurusan` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `mahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dosen` DROP FOREIGN KEY `Dosen_userId_fkey`;

-- DropForeignKey
ALTER TABLE `jadwalkuliah` DROP FOREIGN KEY `JadwalKuliah_dosenId_fkey`;

-- DropForeignKey
ALTER TABLE `jadwalkuliah` DROP FOREIGN KEY `JadwalKuliah_mataKuliahId_fkey`;

-- DropForeignKey
ALTER TABLE `mahasiswa` DROP FOREIGN KEY `Mahasiswa_userId_fkey`;

-- DropForeignKey
ALTER TABLE `mahasiswamatakuliah` DROP FOREIGN KEY `MahasiswaMatakuliah_id_jadwal_kuliah_fkey`;

-- DropForeignKey
ALTER TABLE `mahasiswamatakuliah` DROP FOREIGN KEY `MahasiswaMatakuliah_nim_mahasiswa_fkey`;

-- DropIndex
DROP INDEX `Dosen_userId_key` ON `dosen`;

-- DropIndex
DROP INDEX `MataKuliah_kodeMk_key` ON `matakuliah`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `dosen` DROP COLUMN `nama`,
    DROP COLUMN `noTelp`,
    DROP COLUMN `userId`,
    ADD COLUMN `alamat` VARCHAR(191) NOT NULL,
    ADD COLUMN `jenis_kelamin` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_dosen` VARCHAR(191) NOT NULL,
    MODIFY `nidn` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mahasiswa` DROP COLUMN `angkatan`,
    ADD COLUMN `jurusan` VARCHAR(191) NOT NULL,
    MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `matakuliah` DROP COLUMN `kodeMk`,
    DROP COLUMN `semester`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ALTER COLUMN `role` DROP DEFAULT;

-- DropTable
DROP TABLE `jadwalkuliah`;

-- DropTable
DROP TABLE `mahasiswamatakuliah`;

-- CreateTable
CREATE TABLE `Penjadwalan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hari` VARCHAR(191) NOT NULL,
    `jam_mulai` VARCHAR(191) NOT NULL,
    `jam_selesai` VARCHAR(191) NOT NULL,
    `ruang` VARCHAR(191) NOT NULL,
    `dosenId` INTEGER NOT NULL,
    `matakuliahId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KRS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mahasiswaId` INTEGER NOT NULL,
    `matakuliahId` INTEGER NOT NULL,
    `jadwalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjadwalan` ADD CONSTRAINT `Penjadwalan_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjadwalan` ADD CONSTRAINT `Penjadwalan_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_jadwalId_fkey` FOREIGN KEY (`jadwalId`) REFERENCES `Penjadwalan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
