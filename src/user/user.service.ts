import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserNotFoundException } from "./user.exception";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async addUser(newUser: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<Array<User>> {
    return await this.usersRepository.find();
  }

  async findUser(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async updateUser(
    id: number,
    { birthday, email, name }: UpdateUserDto,
  ): Promise<User | null | string> {
    const userToUpdate = await this.findUser(id);
    if (userToUpdate) {
      if (name) userToUpdate.name = name;
      if (birthday) userToUpdate.birthday = birthday;
      if (email) userToUpdate.email = email;
      await this.usersRepository.save(userToUpdate);
      return `User Id ${id} updated.`;
    }
    return userToUpdate;
  }

  async removeUser(id: number): Promise<User | null | string> {
    const userToDelete = await this.findUser(id);
    if (userToDelete) {
      await this.usersRepository.delete(userToDelete);
      return `User Id ${id} deleted`;
    }
    return userToDelete;
  }
}
