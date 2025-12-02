import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';

@Injectable()
export class DosenService {
  constructor(private prisma: PrismaService) { }

  // CREATE
  async create(createDosenDto: CreateDosenDto) {
    try {
      const dosen = await this.prisma.dosen.create({
        data: createDosenDto,
      });

      return {
        success: true,
        message: 'Dosen created successfully',
        data: dosen,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error creating dosen: ${error.message}`,
        data: null,
      };
    }
  }

  // FIND ALL
  async findAll() {
    try {
      const data = await this.prisma.dosen.findMany();

      return {
        success: true,
        message: 'All dosen fetched successfully',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error fetching dosen: ${error.message}`,
        data: null,
      };
    }
  }

  // FIND ONE
  async findOne(id: number) {
    try {
      const dosen = await this.prisma.dosen.findUnique({
        where: { id },
      });

      if (!dosen) {
        return {
          success: false,
          message: 'Dosen not found',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Dosen found',
        data: dosen,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error fetching dosen: ${error.message}`,
        data: null,
      };
    }
  }

  // UPDATE
  async update(nidn: number, updateDosenDto: UpdateDosenDto) {
    try {
      const findDosen = await this.prisma.dosen.findUnique({
        where: { nidn },
      });

      if (!findDosen) {
        return {
          success: false,
          message: `Dosen dengan NIDN ${nidn} tidak ditemukan`,
          data: null,
        };
      }

      const updatedDosen = await this.prisma.dosen.update({
        where: { nidn },
        data: {
          nama_dosen: updateDosenDto.nama_dosen ?? findDosen.nama_dosen,
          jenis_kelamin: updateDosenDto.jenis_kelamin ?? findDosen.jenis_kelamin,
          alamat: updateDosenDto.alamat ?? findDosen.alamat,
        },
      });

      return {
        success: true,
        message: `Dosen dengan NIDN ${nidn} berhasil diupdate`,
        data: updatedDosen,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error saat update dosen: ${error.message}`,
        data: null,
      };
    }
  }


  // DELETE
  async remove(nidn: number) {
    try {
      const findDosen = await this.prisma.dosen.findUnique({
        where: { nidn },
      });

      if (!findDosen) {
        return {
          success: false,
          message: `Dosen dengan NIDN ${nidn} tidak ditemukan`,
          data: null,
        };
      }

      const deletedDosen = await this.prisma.dosen.delete({
        where: { nidn },
      });

      return {
        success: true,
        message: `Dosen dengan NIDN ${nidn} berhasil dihapus`,
        data: deletedDosen,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error saat menghapus dosen: ${error.message}`,
        data: null,
      };
    }
  }
}
