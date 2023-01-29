import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  createUser(userDetails: CreateUserParams) {
    return this.userRepo.save(userDetails);
  }

  getUsers() {
    return this.userRepo.find();
  }

  getUser(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  updateUser(id: string, userDetails: UpdateUserDto) {
    return this.userRepo.update(id, userDetails);
  }

  deleteUser(id: string) {
    return this.userRepo.delete(id);
  }
}
