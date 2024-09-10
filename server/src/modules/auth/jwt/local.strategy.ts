import { Injectable, UnauthorizedException, Req } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
// Import configuration settings
import Configuration from "config/index";
// Import user service
import { UserService } from "src/modules/user/user.service";

// Extract JWT secret token from configuration
const { JWT_SECRET_TOKEN } = Configuration().JWT;

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy, // Use passport-custom strategy
  "validate_token" // Define the name of the strategy
) {
  constructor(
    private readonly userService: UserService, // Inject user service
    private readonly jwtService: JwtService // Inject JWT service
  ) {
    super(); // Call the parent class constructor
  }

  /**
   * Validate the request to extract and verify the JWT token.
   * @param req - The request object containing headers and cookies
   * @returns The user object if the token is valid
   * @throws UnauthorizedException if the token is missing, invalid, or the user is not found
   */
  async validate(@Req() req: Request) {
    // Extract token from authorization header or cookies
    const bearerToken =
      req.headers?.["authorization"] ||
      `Bearer ${req.cookies?.["accessToken"]}`;

    // Split the token from "Bearer" prefix
    const token = bearerToken?.split(" ")[1];

    // Throw error if token is missing or invalid
    if (
      !token ||
      token === "undefined" ||
      token === null ||
      token.includes("null")
    ) {
      throw new UnauthorizedException("Unauthorized | Sign in Required");
    }

    // Verify token expiration and validity
    try {
      this.jwtService.verify(token, {
        secret: JWT_SECRET_TOKEN,
      });
    } catch (error) {
      throw new UnauthorizedException("Token verification failed");
    }

    // Decode the token to get user information
    const decodeToken: any = this.jwtService.decode(token, {
      json: true,
    });

    // Throw error if the token cannot be decoded
    if (!decodeToken) {
      throw new UnauthorizedException("Token not verified");
    }

    // Find user by ID extracted from the token
    const user = await this.userService.findOne({
      _id: decodeToken._id,
    });

    // Throw error if user is not found
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    // Attach the token to the request object
    req["token"] = token;

    return user; // Return the user object if everything is valid
  }
}
