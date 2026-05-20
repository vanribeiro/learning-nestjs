import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserNotFoundException } from "./user.exception";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async addUser(newUser: User): Promise<User> {
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<Array<User>> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async remove(id: number): Promise<User | null | string> {
    const userToDelete = await this.findOne(id);
    if (userToDelete) {
      await this.usersRepository.delete(userToDelete);
      return `User Id ${id} deleted`;
    }
    return userToDelete;
  }
}
