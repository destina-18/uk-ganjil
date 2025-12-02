import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';

@Injectable()
export class DosenService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateDosenDto) {
    try {
      const existing = await this.prisma.dosen.findUnique({
        where: { nidn: dto.nidn },
      });

      if (existing) {
        return {
          status: 'error',
          message: 'NIDN sudah terdaftar',
          data: null,
        };
      }

      const dosen = await this.prisma.dosen.create({
        data: {
          nidn: dto.nidn,
          nama_dosen: dto.nama_dosen,
          jenis_kelamin: dto.jenis_kelamin,
          alamat: dto.alamat,
        },
      });

      return {
        status: 'success',
        message: 'Dosen berhasil ditambahkan',
        data: {
          nidn: dosen.nidn,
          nama_dosen: dosen.nama_dosen,
          jenis_kelamin: dosen.jenis_kelamin,
          alamat: dosen.alamat,
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
      const dosens = await this.prisma.dosen.findMany({
        select: {
          nidn: true,
          nama_dosen: true,
          jenis_kelamin: true,
          alamat: true,
        },
      });

      return {
        status: 'success',
        message: 'Data dosen berhasil diambil',
        data: dosens,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
        data: null,
      };
    }
  }

  async update(nidn: number, dto: UpdateDosenDto) {
    try {
      const existing = await this.prisma.dosen.findUnique({
        where: { nidn },
      });

      if (!existing) {
        return {
          status: 'error',
          message: 'Dosen tidak ditemukan',
          data: null,
        };
      }

      const dosen = await this.prisma.dosen.update({
        where: { nidn },
        data: dto,
      });

      return {
        status: 'success',
        message: 'Dosen berhasil diupdate',
        data: {
          nidn: dosen.nidn,
          nama_dosen: dosen.nama_dosen,
          jenis_kelamin: dosen.jenis_kelamin,
          alamat: dosen.alamat,
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

  async remove(nidn: number) {
    try {
      const existing = await this.prisma.dosen.findUnique({
        where: { nidn },
      });

      if (!existing) {
        return {
          status: 'error',
          message: 'Dosen tidak ditemukan',
          data: null,
        };
      }

      await this.prisma.dosen.delete({
        where: { nidn },
      });

      return {
        status: 'success',
        message: 'Dosen berhasil dihapus',
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
