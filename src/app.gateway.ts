import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import axios from 'axios';

@WebSocketGateway({ namespace: '/app' })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    this.logger.log('Initialized');
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`${client.id} has connected`);
  }
  handleDisconnect(client: any) {
    this.logger.log(`${client.id} has disconnected`);
  }
  private status: string;
  private scannerList: string[];

  @SubscribeMessage('fromapp')
  handleMessage(client: Socket, payload) {
    console.log('fromapp');
    // this.status = payload.title;
  }

  @SubscribeMessage('getstatus')
  async handleMessage2(client: Socket, payload) {
    console.log('hereee');
    console.log(payload);

    // const { data } = await axios.get('http://localhost:3002/getstatus');
    // console.log('answer:-->', data);
    // this.status = data.data;
    this.wss.emit('printstatus', 'hello from server');
  }

  //   sendToAll() {
  //     ('send');
  //     this.wss.emit('getstatus', 'hello');
  //   }
}
