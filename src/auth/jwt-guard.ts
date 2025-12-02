import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Tambahkan logika custom jika perlu
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // user tidak ada atau token invalid
    if (err || !user) {
      throw err || new UnauthorizedException('Token tidak valid atau expired');
    }
    return user;
  }
}
