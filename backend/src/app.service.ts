import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  health(): object {
    return { status: 'ok' };
  }

  async users(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async create(user: User): Promise<string> {
    const result = await prisma.user.create({
      data: user,
    });

    if (!result) {
      throw new InternalServerErrorException();
    }

    return '';
  }

  throwError(): string {
    throw new HttpException({ message: 'Sample Error' }, 500);
  }
}
