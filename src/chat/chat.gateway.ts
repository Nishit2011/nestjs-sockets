import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server, Client } from 'socket.io';
import { Inject, Logger } from '@nestjs/common';
import {
  CACHE_MANAGER,
  CACHE_MODULE_OPTIONS,
} from '@nestjs/common/cache/cache.constants';

// interface ScannerReg {
//   name: string;
//   gcif: string;
//   scannerId: string;
// }

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {}
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');
  private scannerId: string = '';
  private list = [];

  afterInit(server: any) {
    console.log('xInitialized!');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`${client.id} is xconnected`);
    this.scannerId = client.id;
  }
  handleDisconnect(client: any) {
    console.log(`${client.id} is xdisconnected`);
  }

  @SubscribeMessage('chatToServer')
  async handleMessage(client: Socket, payload) {
    console.log(payload);
    // this.list.map(el => {
    //   if (el.name === payload.name && el.gcif === payload.gcif) {
    //     payload.scannerId = el.scannerId;
    //   }
    // });
    this.list.push({
      name: payload.name,
      gcif: payload.gcif,
    });
    // console.log(this.list);

    this.wss.emit('chatToClient', this.list);
  }

  // @SubscribeMessage('chatToServerFromCtrl')
  // handleCtrlMsg(client: Socket, payload) {
  //   ('diogcat');
  //   return { event: 'chatToClient', data: `From serverCTRL...${payload.name}` };
  // }
}
