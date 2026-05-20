import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("api")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("users")
  async addUser(@Body() userData: User): Promise<User> {
    return this.userService.addUser(userData);
  }

  @Get("users")
  async findAll(): Promise<Array<User>> {
    return await this.userService.findAll();
  }

  @Get("users/:id")
  async findOne(@Param("id") id: string): Promise<User | null> {
    return await this.userService.findUser(Number(id));
  }

  @Put("users/:id")
  async updateOne(
    @Param("id") id: string,
    @Body() body: User,
  ): Promise<User | null | string> {
    return await this.userService.updateUser(Number(id), body);
  }

  @Delete("users/:id")
  async removeOne(@Param("id") id: string): Promise<User | null | string> {
    return await this.userService.removeUser(Number(id));
  }
}
