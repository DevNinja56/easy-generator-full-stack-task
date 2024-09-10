import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Res,
  HttpStatus,
  HttpException,
  NotFoundException,
  Query,
  Logger,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
// @Services
import { UserService } from "./user.service";
// @Dto
import { UpdateUserDto, CreateUserDto } from "./dto";
// @Decorators
import { GetUser } from "src/decorators/get-user.decorator";
// @Utils
import { generalResponse, getHashValue } from "src/utils";
// @Schema
import { PaginationDto } from "src/global.dto";

@ApiTags("Users")
@UseInterceptors(ClassSerializerInterceptor)
@Controller("user")
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("validate_token"))
  @Get()
  async findAllWithPagination(
    @Res() response: Response,
    @Query() paginationDto: PaginationDto
  ) {
    try {
      this.logger.log(
        `Attempting to find users ${paginationDto.page} ${paginationDto.limit}`
      );
      const data = await this.userService.findAllWithPagination({
        page: paginationDto.page,
        limit: paginationDto.limit,
      });
      this.logger.log(
        `Users found successfully ${paginationDto.page} ${paginationDto.limit}`
      );

      generalResponse({
        response,
        message: "Users found successfully",
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      this.logger.error(`Error while finding all users: ${error.message}`);
      throw new HttpException(error["message"], error["status"]);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("validate_token"))
  @Get(":id")
  async findOne(@Res() response: Response, @Param("id") id: string) {
    try {
      this.logger.log(`Attempting to find user: ${id}`);
      const data = await this.userService.findOne({ _id: id });

      if (!data) {
        this.logger.error(`User not found: ${id}`);
        throw new NotFoundException("Enter a valid User ID");
      }
      this.logger.log(`User found successfully: ${id}`);

      generalResponse({
        response,
        message: "User found successfully",
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      this.logger.error(`Error while finding user: ${error.message}`);
      throw new HttpException(error["message"], error["status"]);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("validate_token"))
  @Patch(":id")
  async update(
    @Res() response: Response,
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      this.logger.log(`Attempting to update user: ${id}`);
      const data = await this.userService.update({ _id: id }, updateUserDto);
      this.logger.log(`User updated successfully: ${id}`);

      generalResponse({
        response,
        message: "User updated successfully",
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      this.logger.error(`Error while updating user: ${error.message}`);
      throw new HttpException(error["message"], error["status"]);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("validate_token"))
  @Delete(":id")
  async remove(@Res() response: Response, @Param("id") id: string) {
    try {
      this.logger.log(`Attempting to delete user: ${id}`);
      const data = await this.userService.remove({ _id: id });
      this.logger.log(`User deleted successfully: ${id}`);

      generalResponse({
        response,
        message: "User deleted successfully",
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      this.logger.error(`Error while deleting user: ${error.message}`);
      throw new HttpException(error["message"], error["status"]);
    }
  }
}
