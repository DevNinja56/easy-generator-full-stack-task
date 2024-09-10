import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

/**
 * Bootstrap function that initializes and starts the Nest.js application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const httpAdapterHost = app.get(HttpAdapterHost);

  // Set global prefix for all routes
  app.setGlobalPrefix("api");

  // Apply global validation pipe to transform incoming data
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Apply global exception filter to handle HTTP exceptions
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: "*", // Allow all origins
    methods: "GET, PATCH, POST, DELETE",
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = process.env.PORT || Number(configService.get("PORT"));

  // Configure Swagger documentation
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("EG Test Task API")
    .setDescription("EG Test Task APIs Documentation")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/", app, document);

  // Start listening on the specified port
  await app.listen(port);
}

bootstrap();
