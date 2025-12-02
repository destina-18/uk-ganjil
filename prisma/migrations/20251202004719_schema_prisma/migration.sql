-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'MAHASISWA') NOT NULL DEFAULT 'MAHASISWA',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dosen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nidn` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `noTelp` VARCHAR(191) NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Dosen_nidn_key`(`nidn`),
    UNIQUE INDEX `Dosen_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `angkatan` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Mahasiswa_nim_key`(`nim`),
    UNIQUE INDEX `Mahasiswa_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MataKuliah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kodeMk` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `sks` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,

    UNIQUE INDEX `MataKuliah_kodeMk_key`(`kodeMk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JadwalKuliah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kodeJadwal` VARCHAR(191) NOT NULL,
    `hari` VARCHAR(191) NOT NULL,
    `jamMulai` VARCHAR(191) NOT NULL,
    `jamSelesai` VARCHAR(191) NOT NULL,
    `ruangan` VARCHAR(191) NOT NULL,
    `dosenId` INTEGER NOT NULL,
    `mataKuliahId` INTEGER NOT NULL,

    UNIQUE INDEX `JadwalKuliah_kodeJadwal_key`(`kodeJadwal`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MahasiswaMatakuliah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim_mahasiswa` VARCHAR(191) NOT NULL,
    `id_jadwal_kuliah` INTEGER NOT NULL,
    `tahun_ajaran` VARCHAR(191) NULL,
    `semester` ENUM('Ganjil', 'Genap') NULL,
    `status_validasi` ENUM('valid', 'bentrok', 'sks_kurang', 'sks_lebih') NULL,

    UNIQUE INDEX `MahasiswaMatakuliah_nim_mahasiswa_id_jadwal_kuliah_key`(`nim_mahasiswa`, `id_jadwal_kuliah`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dosen` ADD CONSTRAINT `Dosen_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JadwalKuliah` ADD CONSTRAINT `JadwalKuliah_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JadwalKuliah` ADD CONSTRAINT `JadwalKuliah_mataKuliahId_fkey` FOREIGN KEY (`mataKuliahId`) REFERENCES `MataKuliah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MahasiswaMatakuliah` ADD CONSTRAINT `MahasiswaMatakuliah_nim_mahasiswa_fkey` FOREIGN KEY (`nim_mahasiswa`) REFERENCES `Mahasiswa`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MahasiswaMatakuliah` ADD CONSTRAINT `MahasiswaMatakuliah_id_jadwal_kuliah_fkey` FOREIGN KEY (`id_jadwal_kuliah`) REFERENCES `JadwalKuliah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
