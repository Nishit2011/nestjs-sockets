import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Controller('scanner')
export class AppController {
  constructor(private appGateway: AppGateway) {}

  // @Get()
  // @HttpCode(200)
  // fetchScannerStatus() {
  //   const res = this.appGateway.sendToAll();
  //   console.log('--->', res);
  // }
}
