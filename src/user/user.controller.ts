import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
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
  async findUser(@Param("id") id: string): Promise<User | null> {
    const user = await this.userService.findOne(Number(id));
    return user;
  }

  @Delete("users/:id")
  async removeUser(@Param("id") id: string): Promise<User | null | string> {
    return await this.userService.remove(Number(id));
  }
}
