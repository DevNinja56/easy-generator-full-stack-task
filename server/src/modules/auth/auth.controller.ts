import {
  Post,
  Body,
  ValidationPipe,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  HttpException,
  Res,
  Headers,
  Logger,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
// @Decorators
import { GetUser } from "src/decorators/get-user.decorator";
// @Dto
import { SignInCredentialsDto, SignupCredentialsDto } from "./dto";
// @Entities
import { Users } from "../user/schema/user.schema";
// @Services
import { AuthService } from "./auth.service";
// @Utils
import { generalResponse } from "src/utils";

@ApiTags("Auth")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  // ********** User Register Process ********** //
  @Post("signup")
  async signUp(
    @Headers("origin") origin: any,
    @Res() response: Response,
    @Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto
  ) {
    try {
      this.logger.log(
        `Attempting to sign up user: ${signupCredentialsDto.email}`
      );
      const data = await this.authService.signUp(signupCredentialsDto, origin);
      response.cookie("accessToken", data.accessToken);

      if (data && data["message"] && data["status"]) {
        this.logger.error(
          `Error signing up user: ${signupCredentialsDto.email}`,
          data["message"]
        );
        generalResponse({
          response,
          message: data["message"],
          status: data["status"],
        });
      } else {
        this.logger.log(
          `User signed up successfully: ${signupCredentialsDto.email}`
        );
        generalResponse({
          response,
          message: "User created successfully",
          status: HttpStatus.CREATED,
          data,
        });
      }
    } catch (error) {
      this.logger.error(
        `Error signing up user: ${signupCredentialsDto.email}`,
        error.stack
      );
      throw new HttpException(error["message"], error["status"]);
    }
  }

  // ********** User Login Process ********** //
  @Post("signin")
  async signIn(
    @Res() response: Response,
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto
  ) {
    try {
      this.logger.log(
        `Attempting to sign in user: ${signInCredentialsDto.email}`
      );
      const data = await this.authService.signIn(signInCredentialsDto);
      response.cookie("accessToken", data.accessToken);
      this.logger.log(
        `User signed in successfully: ${signInCredentialsDto.email}`
      );

      generalResponse({
        response,
        message: `Session created successful`,
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      this.logger.error(
        `Error signing in user: ${signInCredentialsDto.email}`,
        error.stack
      );
      throw new HttpException(error["message"], error["status"]);
    }
  }

  @Get("get-user")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("validate_token"))
  async getUserDetail(@Res() response: Response, @GetUser() user: Users) {
    try {
      this.logger.log(`Attempting to get user: ${user.email}`);
      const data = await this.authService.getUser({ _id: user.id });
      this.logger.log(`User found successfully: ${user.email}`);

      generalResponse({
        response,
        message: `User found successful`,
        status: HttpStatus.OK,
        data,
      });
    } catch (error) {
      this.logger.error(`Error getting user: ${user.email}`, error.stack);
      throw new HttpException(error["message"], error["status"]);
    }
  }
}
