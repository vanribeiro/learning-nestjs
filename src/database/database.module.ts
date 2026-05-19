import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "mysql",
        host: config.get<string>("DB_HOST"),
        port: config.get<number>("DB_PORT", 3306),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        database: config.get<string>("DB_DATABASE"),
        entities: [User],
        autoLoadEntities: true,
        synchronize: config.get<string>("NODE_ENV") === "localhost",
      }),
    }),
  ],
})
export class DatabaseSettings {}
