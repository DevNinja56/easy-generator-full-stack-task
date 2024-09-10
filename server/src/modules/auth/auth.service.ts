import {
  BadRequestException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
// @Services
import { UserService } from "../user/user.service";
// @Dto
import { SignInCredentialsDto, SignupCredentialsDto } from "./dto";
// @Repositories
import { AuthRepository } from "./auth.repository";
// @Utils
import { compareHashValue, getHashValue } from "src/utils";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService
  ) {}

  async signUp(signupCredentialsDto: SignupCredentialsDto, origin: string) {
    const { password } = signupCredentialsDto;

    const user = await this.userService.findOne({
      email: signupCredentialsDto.email,
    });
    if (user) {
      return { status: HttpStatus.CONFLICT, message: "User already exists" };
    }

    const hashPassword = await getHashValue(password);

    // create password for user
    signupCredentialsDto.password = hashPassword;

    const data = await this.userService.create(signupCredentialsDto);

    // create access and refresh token
    const accessToken = await this.authRepository.getAccessToken(data["id"]);

    return { accessToken, user: data };
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto) {
    const { email, password } = signInCredentialsDto;
    // Find user
    const user: any = await this.userService.findOne({ email });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    // Validate password
    const compareHash = await compareHashValue(password, user["password"]);

    if (!compareHash) {
      throw new BadRequestException("Invalid Password");
    }
    // create tokens
    const accessToken = await this.authRepository.getAccessToken(user.id);

    return { accessToken, user };
  }

  async getUser(condition: object) {
    return await this.userService.findOne(condition);
  }
}
