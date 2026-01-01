import { Controller, Get } from '@nestjs/common';

@Controller()
export class testController {
  @Get("/test")
  getTest(): JSON {
    const testJsonData = {
      "name": "NestJS Application",
    }
    return JSON.parse(JSON.stringify(testJsonData));
  }
}
