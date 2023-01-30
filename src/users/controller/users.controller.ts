import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';
import { CreateUserPostDto } from '../dtos/createUserPosts.dto';
import { UserProfileDto } from '../dtos/createUserProfile.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() userCreateDto: CreateUserDto) {
    const user = this.userService.createUser(userCreateDto);
    return user;
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  GetUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userUpadteDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userUpadteDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }

  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userProfileDto: UserProfileDto,
  ) {
    const profile = this.userService.createUserProfile(id, userProfileDto);
    return profile;
  }

  @Post(':id/posts')
  createUserPosts(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userPostDto: CreateUserPostDto,
  ) {
    console.log(userPostDto);
    const post = this.userService.createUserPosts(id, userPostDto);
    return post;
  }
}
