# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine as runner

# Set the working directory in the container
WORKDIR /app

# Copy built files from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Copy the .env file
COPY --from=builder /app/.env ./.env

# Expose port 3001
EXPOSE 3001

# Command to run the NestJS app
CMD ["node", "dist/src/main.js"]
