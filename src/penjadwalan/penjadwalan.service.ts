import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePenjadwalanDto } from './dto/create-penjadwalan.dto';
import { UpdatePenjadwalanDto } from './dto/update-penjadwalan.dto';

@Injectable()
export class PenjadwalanService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreatePenjadwalanDto) {
        try {
            const dosen = await this.prisma.dosen.findUnique({
                where: { nidn: dto.id_dosen },
            });

            if (!dosen) {
                return {
                    status: 'error',
                    message: 'Dosen tidak ditemukan',
                    data: null,
                };
            }

            const matakuliah = await this.prisma.matakuliah.findUnique({
                where: { id_matakuliah: dto.id_matakuliah },
            });

            if (!matakuliah) {
                return {
                    status: 'error',
                    message: 'Matakuliah tidak ditemukan',
                    data: null,
                };
            }

            const existingSchedule = await this.prisma.penjadwalan.findUnique({
                where: { id_matakuliah: dto.id_matakuliah },
            });

            if (existingSchedule) {
                return {
                    status: 'error',
                    message: 'Matakuliah sudah memiliki jadwal',
                    data: null,
                };
            }

            const penjadwalan = await this.prisma.penjadwalan.create({
                data: {
                    id_dosen: dto.id_dosen,
                    id_matakuliah: dto.id_matakuliah,
                    jadwal: dto.jadwal,
                },
            });

            return {
                status: 'success',
                message: 'Penjadwalan berhasil ditambahkan',
                data: {
                    id: penjadwalan.id,
                    id_dosen: penjadwalan.id_dosen,
                    id_matakuliah: penjadwalan.id_matakuliah,
                    jadwal: penjadwalan.jadwal,
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

    async findAll() {
        try {
            const penjadwalans = await this.prisma.penjadwalan.findMany({
                select: {
                    id: true,
                    id_dosen: true,
                    id_matakuliah: true,
                    jadwal: true,
                },
            });

            return {
                status: 'success',
                message: 'Data penjadwalan berhasil diambil',
                data: penjadwalans,
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null,
            };
        }
    }

    async findOne(id: number) {
        try {
            const penjadwalan = await this.prisma.penjadwalan.findUnique({
                where: { id },
                select: {
                    id: true,
                    id_dosen: true,
                    id_matakuliah: true,
                    jadwal: true,
                },
            });

            if (!penjadwalan) {
                return {
                    status: 'error',
                    message: 'Penjadwalan tidak ditemukan',
                    data: null,
                };
            }

            return {
                status: 'success',
                message: 'Data penjadwalan berhasil diambil',
                data: penjadwalan,
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null,
            };
        }
    }

    async update(id: number, dto: UpdatePenjadwalanDto) {
        try {
            const existing = await this.prisma.penjadwalan.findUnique({
                where: { id },
            });

            if (!existing) {
                return {
                    status: 'error',
                    message: 'Penjadwalan tidak ditemukan',
                    data: null,
                };
            }

            if (dto.id_dosen) {
                const dosen = await this.prisma.dosen.findUnique({
                    where: { nidn: dto.id_dosen },
                });

                if (!dosen) {
                    return {
                        status: 'error',
                        message: 'Dosen tidak ditemukan',
                        data: null,
                    };
                }
            }

            if (dto.id_matakuliah) {
                const matakuliah = await this.prisma.matakuliah.findUnique({
                    where: { id_matakuliah: dto.id_matakuliah },
                });

                if (!matakuliah) {
                    return {
                        status: 'error',
                        message: 'Matakuliah tidak ditemukan',
                        data: null,
                    };
                }
            }

            const penjadwalan = await this.prisma.penjadwalan.update({
                where: { id },
                data: dto,
            });

            return {
                status: 'success',
                message: 'Penjadwalan berhasil diupdate',
                data: {
                    id: penjadwalan.id,
                    id_dosen: penjadwalan.id_dosen,
                    id_matakuliah: penjadwalan.id_matakuliah,
                    jadwal: penjadwalan.jadwal,
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

    async remove(id: number) {
        try {
            const existing = await this.prisma.penjadwalan.findUnique({
                where: { id },
            });

            if (!existing) {
                return {
                    status: 'error',
                    message: 'Penjadwalan tidak ditemukan',
                    data: null,
                };
            }

            await this.prisma.penjadwalan.delete({
                where: { id },
            });

            return {
                status: 'success',
                message: 'Penjadwalan berhasil dihapus',
                data: null,
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
