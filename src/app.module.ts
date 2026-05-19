import { Module } from "@nestjs/common";
import { AppController, AppService } from "./app";
import { UserModule } from "./user";
import { ConfigModule } from "@nestjs/config";
import { DatabaseSettings } from "./database";
import { DataSource } from "typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    DatabaseSettings,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
