import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) { }

  async register(username: string, password: string, role: string) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { username },
        include: { mahasiswa: true },
      });

      if (existing) {
        return {
          status: "error",
          message: "Username sudah digunakan",
        };
      }

      const hash = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
        data: {
          username,
          password: hash,
          role: role as any,
        },
      });

      return {
        status: "success",
        message: "Register berhasil",
        data: {
          username: user.username,
          role: user.role,
        },
      };
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      return {
        status: "error",
        message: `Something went wrong: ${error.message}`,
      };
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { username } });
      if (!user) return {
        status: "error",
        message: "User tidak ditemukan"
      };

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return {
        status: "error",
        message: "Password salah"
      };

      const payload = { sub: user.id, role: user.role };
      const token = await this.jwt.signAsync(payload);

      return {
        status: "success",
        message: "Login berhasil",
        data: { token, role: user.role },
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Something went wrong: ${error?.message || "Internal Server Error"}`,
      };
    }
  }
}
