import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPost } from 'src/typeorm/entities/post.entity';
import { UserProfile } from 'src/typeorm/entities/profile.entity';
import { User } from 'src/typeorm/entities/user.entity';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>,
    @InjectRepository(UserPost) private postRepo: Repository<UserPost>,
  ) {}

  createUser(userDetails: CreateUserParams) {
    return this.userRepo.save(userDetails);
  }

  /**
   * to get the relation wo must pass the relation array in find method
   * @returns
   */
  getUsers() {
    return this.userRepo.find({ relations: ['profile', 'post'] });
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

  async createUserProfile(id: string, profileDetails: CreateUserProfileParams) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const userProfile = await this.profileRepo.save(profileDetails);
    user.profile = userProfile;
    return this.userRepo.save(user);
  }

  async createUserPosts(id: string, postDetails: CreateUserPostParams) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return this.postRepo.save({ ...postDetails, user });
  }
}
