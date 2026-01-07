import { Injectable } from '@nestjs/common';
import { ITest } from './ITest';
@Injectable()
export class AppService implements ITest {
  getHello(): string {
    return 'Hello World!';
  }

  public testFunc() : void {
    console.log('abcasdfasdf')
  }
  
}
