import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
// @Services
import { UserService } from "src/modules/user/user.service";
import Configuration from "config/index";

const { JWT_SECRET_TOKEN } = Configuration().JWT;

@Injectable()
export class AuthRepository {
  constructor(
    private readonly userServices: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async getAccessToken(id: string) {
    return this.jwtService.sign(
      { _id: id },
      {
        secret: this.configService.get("JWT.JWT_SECRET_TOKEN"),
        expiresIn: this.configService.get("JWT.JWT_TOKEN_EXPIRATION"),
      }
    );
  }
}
