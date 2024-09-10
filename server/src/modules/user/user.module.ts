import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
// @Controller
import { UserController } from './user.controller';
// @Services
import { UserService } from './user.service';
// @Repositories
import { UserRepository } from './user.repository';
// @Schema
import { Users, UsersSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
