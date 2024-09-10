import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
// @Controller
import { AuthController } from "./auth.controller";
// @Services
import { AuthService } from "./auth.service";
// @JWT Strategy

import { LocalStrategy } from "./jwt/local.strategy";
// @Configuration
import configuration from "config/index";
// @Modules
import { UserModule } from "../user/user.module";
// @Repository
import { AuthRepository } from "./auth.repository";

const { JWT_SECRET_TOKEN, JWT_TOKEN_EXPIRATION } = configuration().JWT;

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({
      secret: JWT_SECRET_TOKEN,
      signOptions: {
        expiresIn: JWT_TOKEN_EXPIRATION,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy],
})
export class AuthModule {}
