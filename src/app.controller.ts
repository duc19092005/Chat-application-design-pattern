import { Controller, Get, Inject, Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import type { ITest } from './ITest';

@Controller()
export class AppController {
  constructor(
    @Inject('ITest')
    private readonly appService: ITest) {}

  @Get()
  getHello(): string {
    this.appService.testFunc()
    return "abc";
  }

  @Get("/test")
  getTest(): JSON {
    const testJsonData = {
      "name": "NestJS Application",
    }
    return JSON.parse(JSON.stringify(testJsonData));
  }
}
