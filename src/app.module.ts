import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
        provide: 'ITest',
        useClass: AppService,
      },
  ],
})
export class AppModule {}
