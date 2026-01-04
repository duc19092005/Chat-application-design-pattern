import { Module } from "@nestjs/common";
import { BCryptProvider } from "./infrastructure/persistence/provider/bcrypt-provider";

@Module({
  providers: [
    {
      provide: 'IBcyptProvider',
      useClass: BCryptProvider,
    },
  ],
})

export class IdentityAccessModule {}