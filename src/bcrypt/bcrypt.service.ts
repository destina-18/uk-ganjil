import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  compare(password: string, password1: any) {
    throw new Error('Method not implemented.');
  }
}
