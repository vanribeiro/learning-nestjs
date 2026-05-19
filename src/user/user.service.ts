import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

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

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
