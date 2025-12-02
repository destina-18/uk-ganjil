import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TopAnalisisDto } from './dto/top-analisis.dto';

@Injectable()
export class AnalisisService {
    constructor(private prisma: PrismaService) { }

    async getTopMatakuliahDosen(dto: TopAnalisisDto) {
        try {
            const limit = dto.limit || 10;
            const whereClause: any = {};

            if (dto.tahun_ajaran) {
                whereClause.tahun_ajaran = dto.tahun_ajaran;
            }

            if (dto.semester) {
                whereClause.semester = dto.semester;
            }

            const matakuliahData = await this.prisma.mahasiswaMatakuliah.groupBy({
                by: ['id_matakuliah'],
                where: whereClause,
                _count: {
                    mahasiswa_nim: true,
                },
                orderBy: {
                    _count: {
                        mahasiswa_nim: 'desc',
                    },
                },
                take: limit,
            });

            const topMatakuliah = await Promise.all(
                matakuliahData.map(async (item) => {
                    const matakuliah = await this.prisma.matakuliah.findUnique({
                        where: { id_matakuliah: item.id_matakuliah },
                    });

                    const enrollments = await this.prisma.mahasiswaMatakuliah.findMany({
                        where: {
                            id_matakuliah: item.id_matakuliah,
                            ...whereClause,
                        },
                        include: {
                            matakuliah: true,
                        },
                    });

                    const totalSksDigunakan = enrollments.reduce(
                        (sum, e) => sum + e.matakuliah.sks,
                        0,
                    );

                    return {
                        id_matakuliah: item.id_matakuliah,
                        nama_matakuliah: matakuliah?.nama_matakuliah || '',
                        total_mahasiswa_memilih: item._count.mahasiswa_nim,
                        total_sks_diambil: totalSksDigunakan,
                    };
                }),
            );

            const dosenEnrollments = await this.prisma.mahasiswaMatakuliah.findMany({
                where: whereClause,
                include: {
                    matakuliah: {
                        include: {
                            dosen: true,
                        },
                    },
                },
            });

            const dosenMap = new Map<
                number,
                {
                    nama: string;
                    mahasiswaSet: Set<string>;
                    matakuliahSet: Set<number>;
                }
            >();

            dosenEnrollments.forEach((enrollment) => {
                const dosenId = enrollment.matakuliah.id_dosen;
                const dosenNama = enrollment.matakuliah.dosen.nama_dosen;

                if (!dosenMap.has(dosenId)) {
                    dosenMap.set(dosenId, {
                        nama: dosenNama,
                        mahasiswaSet: new Set(),
                        matakuliahSet: new Set(),
                    });
                }

                const dosenData = dosenMap.get(dosenId);
                if (dosenData) {
                    dosenData.mahasiswaSet.add(enrollment.mahasiswa_nim);
                    dosenData.matakuliahSet.add(enrollment.id_matakuliah);
                }
            });

            const topDosen = Array.from(dosenMap.entries())
                .map(([id_dosen, data]) => ({
                    id_dosen,
                    nama_dosen: data.nama,
                    total_mahasiswa_memilih: data.mahasiswaSet.size,
                    total_matakuliah_diampu: data.matakuliahSet.size,
                }))
                .sort((a, b) => b.total_mahasiswa_memilih - a.total_mahasiswa_memilih)
                .slice(0, limit);

            return {
                status: 'success',
                message: 'Analisis berhasil diambil',
                data: {
                    top_matakuliah: topMatakuliah,
                    top_dosen: topDosen,
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
