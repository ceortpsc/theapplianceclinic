import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../../auth/ws-jwt.guard';
import { PrismaService } from 'packages/database/src/prisma.service';

@WebSocketGateway({ namespace: '/dispatch', cors: true })
export class DispatchGateway {
  @WebSocketServer() server: Server;

  constructor(private prisma: PrismaService) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('updateCoordinates')
  async handleCoordinateUpdate(
    @MessageBody() data: { workOrderId: string; lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ) {
    const updatedOrder = await this.prisma.workOrder.update({
      where: { id: data.workOrderId },
      data: { latitude: data.lat, longitude: data.lng },
    });

    // Broadcast live location stream to Dispatcher Board UI
    this.server.emit(`liveLocation:${data.workOrderId}`, {
      technicianId: updatedOrder.technicianId,
      latitude: data.lat,
      longitude: data.lng,
    });
  }
}
