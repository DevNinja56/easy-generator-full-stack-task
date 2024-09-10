# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json file to the container
COPY package.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the React app with a Node.js server
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install the `serve` package globally to serve the React app
RUN npm install -g serve

# Copy the build files from the previous stage
COPY --from=build /app/build ./build

# Expose port 3000 for the server
EXPOSE 3000

# Command to serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]
