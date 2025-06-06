import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
})
export class ClientsModule {}
