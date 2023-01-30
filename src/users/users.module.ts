import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPost } from 'src/typeorm/entities/post.entity';
import { UserProfile } from 'src/typeorm/entities/profile.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile, UserPost])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
