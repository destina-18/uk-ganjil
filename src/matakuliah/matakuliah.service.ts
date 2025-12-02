import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';

@Injectable()
export class MatakuliahService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateMatakuliahDto) {
        try {
            const existing = await this.prisma.matakuliah.findUnique({
                where: { id_matakuliah: dto.id_matakuliah },
            });

            if (existing) {
                return {
                    status: 'error',
                    message: 'ID Matakuliah sudah terdaftar',
                    data: null,
                };
            }

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

            const matakuliah = await this.prisma.matakuliah.create({
                data: {
                    id_matakuliah: dto.id_matakuliah,
                    nama_matakuliah: dto.nama_matakuliah,
                    id_dosen: dto.id_dosen,
                    sks: dto.sks,
                },
            });

            return {
                status: 'success',
                message: 'Matakuliah berhasil ditambahkan',
                data: {
                    id_matakuliah: matakuliah.id_matakuliah,
                    nama_matakuliah: matakuliah.nama_matakuliah,
                    id_dosen: matakuliah.id_dosen,
                    sks: matakuliah.sks,
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
            const matakuliahs = await this.prisma.matakuliah.findMany({
                select: {
                    id_matakuliah: true,
                    nama_matakuliah: true,
                    id_dosen: true,
                    sks: true,
                },
            });

            return {
                status: 'success',
                message: 'Data matakuliah berhasil diambil',
                data: matakuliahs,
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null,
            };
        }
    }

    async update(id: number, dto: UpdateMatakuliahDto) {
        try {
            const existing = await this.prisma.matakuliah.findUnique({
                where: { id_matakuliah: id },
            });

            if (!existing) {
                return {
                    status: 'error',
                    message: 'Matakuliah tidak ditemukan',
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

            const matakuliah = await this.prisma.matakuliah.update({
                where: { id_matakuliah: id },
                data: dto,
            });

            return {
                status: 'success',
                message: 'Matakuliah berhasil diupdate',
                data: {
                    id_matakuliah: matakuliah.id_matakuliah,
                    nama_matakuliah: matakuliah.nama_matakuliah,
                    id_dosen: matakuliah.id_dosen,
                    sks: matakuliah.sks,
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
            const existing = await this.prisma.matakuliah.findUnique({
                where: { id_matakuliah: id },
            });

            if (!existing) {
                return {
                    status: 'error',
                    message: 'Matakuliah tidak ditemukan',
                    data: null,
                };
            }

            await this.prisma.matakuliah.delete({
                where: { id_matakuliah: id },
            });

            return {
                status: 'success',
                message: 'Matakuliah berhasil dihapus',
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
