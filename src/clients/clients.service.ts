import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Client[]> {
    return this.prismaService.client.findMany();
  }
  public getAllExtended(): Promise<Client[]> {
    return this.prismaService.client.findMany({
      include: { orders: true },
    });
  }
  public getExtendedById(id: Client['id']): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: { id },
      include: { orders: true },
    });
  }
  public getById(id: Client['id']): Promise<Client | null> {
    return this.prismaService.client.findUnique({
      where: { id },
    });
  }
  public removeOne(id: Client['id']): Promise<Client> {
    return this.prismaService.client.delete({
      where: { id },
    });
  }
  public create(
    clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Client> {
    const newClient = { ...clientData, id: uuidv4() };
    return this.prismaService.client.create({
      data: newClient,
    });
  }
  public updateById(
    id: Client['id'],
    clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Client> {
    return this.prismaService.client.update({
      where: { id },
      data: clientData,
    });
  }
}
