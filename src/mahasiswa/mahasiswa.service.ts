import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class MahasiswaService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateMahasiswaDto) {
        try {
            const existing = await this.prisma.mahasiswa.findUnique({
                where: { nim: dto.nim },
            });

            if (existing) {
                return {
                    status: 'error',
                    message: 'NIM sudah terdaftar',
                    data: null,
                };
            }

            const hashedPassword = await bcrypt.hash(dto.nim, 10);

            const user = await this.prisma.user.create({
                data: {
                    username: dto.nim,
                    password: hashedPassword,
                    role: 'MAHASISWA',
                },
            });

            const mahasiswa = await this.prisma.mahasiswa.create({
                data: {
                    nim: dto.nim,
                    nama_mahasiswa: dto.nama_mahasiswa,
                    jenis_kelamin: dto.jenis_kelamin,
                    jurusan: dto.jurusan,
                    userId: user.id,
                },
            });

            return {
                status: 'success',
                message: 'Mahasiswa berhasil ditambahkan',
                data: {
                    nim: mahasiswa.nim,
                    nama_mahasiswa: mahasiswa.nama_mahasiswa,
                    jenis_kelamin: mahasiswa.jenis_kelamin,
                    jurusan: mahasiswa.jurusan,
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
            const mahasiswas = await this.prisma.mahasiswa.findMany({
                select: {
                    nim: true,
                    nama_mahasiswa: true,
                    jenis_kelamin: true,
                    jurusan: true,
                },
            });

            return {
                status: 'success',
                message: 'Data mahasiswa berhasil diambil',
                data: mahasiswas,
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                data: null,
            };
        }
    }

    async update(nim: string, dto: UpdateMahasiswaDto) {
        try {
            const existing = await this.prisma.mahasiswa.findUnique({
                where: { nim },
            });

            if (!existing) {
                return {
                    status: 'error',
                    message: 'Mahasiswa tidak ditemukan',
                    data: null,
                };
            }

            const mahasiswa = await this.prisma.mahasiswa.update({
                where: { nim },
                data: dto,
            });

            return {
                status: 'success',
                message: 'Mahasiswa berhasil diupdate',
                data: {
                    nim: mahasiswa.nim,
                    nama_mahasiswa: mahasiswa.nama_mahasiswa,
                    jenis_kelamin: mahasiswa.jenis_kelamin,
                    jurusan: mahasiswa.jurusan,
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

    async remove(nim: string) {
        try {
            const existing = await this.prisma.mahasiswa.findUnique({
                where: { nim },
                include: { user: true },
            });

            if (!existing) {
                return {
                    status: 'error',
                    message: 'Mahasiswa tidak ditemukan',
                    data: null,
                };
            }

            await this.prisma.mahasiswa.delete({
                where: { nim },
            });

            return {
                status: 'success',
                message: 'Mahasiswa berhasil dihapus',
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
