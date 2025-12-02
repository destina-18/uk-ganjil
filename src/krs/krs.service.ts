import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PilihMatakuliahDto } from './dto/pilih-matakuliah.dto';
import { LihatJadwalDto } from './dto/lihat-jadwal.dto';

@Injectable()
export class KrsService {
    constructor(private prisma: PrismaService) { }

    private parseJadwal(jadwal: string): {
        hari: string;
        jamMulai: number;
        jamSelesai: number;
    } | null {
        const match = jadwal.match(
            /^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s*(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})$/,
        );

        if (!match) return null;

        const [, hari, startHour, startMin, endHour, endMin] = match;
        const jamMulai = parseInt(startHour) * 60 + parseInt(startMin);
        const jamSelesai = parseInt(endHour) * 60 + parseInt(endMin);

        return { hari, jamMulai, jamSelesai };
    }

    private checkTimeOverlap(
        start1: number,
        end1: number,
        start2: number,
        end2: number,
    ): boolean {
        return start1 < end2 && start2 < end1;
    }

    async pilihMatakuliah(dto: PilihMatakuliahDto) {
        try {
            const mahasiswa = await this.prisma.mahasiswa.findUnique({
                where: { nim: dto.mahasiswa_id },
            });

            if (!mahasiswa) {
                return {
                    status: 'error',
                    message: 'Mahasiswa tidak ditemukan',
                    data: null,
                };
            }

            const matakuliahs = await this.prisma.matakuliah.findMany({
                where: {
                    id_matakuliah: { in: dto.matakuliah_ids },
                },
                include: {
                    penjadwalan: true,
                },
            });

            if (matakuliahs.length !== dto.matakuliah_ids.length) {
                return {
                    status: 'error',
                    message: 'Beberapa matakuliah tidak ditemukan',
                    data: null,
                };
            }

            const existingEnrollments = await this.prisma.mahasiswaMatakuliah.findMany({
                where: { mahasiswa_nim: dto.mahasiswa_id },
                include: {
                    matakuliah: {
                        include: {
                            penjadwalan: true,
                        },
                    },
                },
            });

            const existingSks = existingEnrollments.reduce(
                (sum, e) => sum + e.matakuliah.sks,
                0,
            );
            const newSks = matakuliahs.reduce((sum, m) => sum + m.sks, 0);
            const totalSks = existingSks + newSks;

            if (totalSks < 15) {
                return {
                    status: 'error',
                    message: 'Total SKS kurang dari 15',
                    data: null,
                };
            }

            if (totalSks > 23) {
                return {
                    status: 'error',
                    message: 'Total SKS lebih dari 23',
                    data: null,
                };
            }

            const allSchedules = [
                ...existingEnrollments
                    .filter((e) => e.matakuliah.penjadwalan)
                    .map((e) => ({
                        id: e.matakuliah.id_matakuliah,
                        jadwal: e.matakuliah.penjadwalan!.jadwal,
                    })),
                ...matakuliahs
                    .filter((m) => m.penjadwalan)
                    .map((m) => ({
                        id: m.id_matakuliah,
                        jadwal: m.penjadwalan!.jadwal,
                    })),
            ];

            const parsedSchedules = allSchedules
                .map((s) => ({
                    id: s.id,
                    ...this.parseJadwal(s.jadwal),
                }))
                .filter((s) => s.hari !== undefined);

            for (let i = 0; i < parsedSchedules.length; i++) {
                for (let j = i + 1; j < parsedSchedules.length; j++) {
                    const s1 = parsedSchedules[i];
                    const s2 = parsedSchedules[j];

                    if (s1.hari === s2.hari && s1.jamMulai !== undefined && s1.jamSelesai !== undefined && s2.jamMulai !== undefined && s2.jamSelesai !== undefined) {
                        if (
                            this.checkTimeOverlap(s1.jamMulai, s1.jamSelesai, s2.jamMulai, s2.jamSelesai)
                        ) {
                            return {
                                status: 'error',
                                message: 'Jadwal bentrok',
                                data: null,
                            };
                        }
                    }
                }
            }

            await this.prisma.mahasiswaMatakuliah.createMany({
                data: dto.matakuliah_ids.map((id) => ({
                    mahasiswa_nim: dto.mahasiswa_id,
                    id_matakuliah: id,
                })),
                skipDuplicates: true,
            });

            return {
                status: 'success',
                message: 'Matakuliah berhasil dipilih',
                data: {
                    mahasiswa_id: dto.mahasiswa_id,
                    matakuliah_ids: dto.matakuliah_ids,
                    total_sks: totalSks,
                },
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null,
            };
        }
    }

    async lihatJadwal(dto: LihatJadwalDto) {
        try {
            const mahasiswa = await this.prisma.mahasiswa.findUnique({
                where: { nim: dto.mahasiswa_id },
            });

            if (!mahasiswa) {
                return {
                    status: 'error',
                    message: 'Mahasiswa tidak ditemukan',
                    data: null,
                };
            }

            const enrollments = await this.prisma.mahasiswaMatakuliah.findMany({
                where: { mahasiswa_nim: dto.mahasiswa_id },
                include: {
                    matakuliah: {
                        include: {
                            penjadwalan: true,
                        },
                    },
                },
            });

            const jadwal = enrollments
                .filter((e) => e.matakuliah.penjadwalan)
                .map((e) => ({
                    id_matakuliah: e.matakuliah.id_matakuliah,
                    nama_matakuliah: e.matakuliah.nama_matakuliah,
                    jadwal: e.matakuliah.penjadwalan!.jadwal,
                }));

            return {
                status: 'success',
                message: 'Jadwal berhasil diambil',
                data: {
                    mahasiswa_id: dto.mahasiswa_id,
                    jadwal,
                },
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null,
            };
        }
    }
}
