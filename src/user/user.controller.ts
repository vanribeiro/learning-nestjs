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
    return (await this.userService.findAll()) || [];
  }

  @Get("users/:id")
  async findUser(@Param("id") id: string): Promise<User | null> {
    return await this.userService.findOne(Number(id));
  }

  @Delete("users/:id")
  async remove(id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
