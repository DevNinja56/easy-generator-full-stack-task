
# EG Test Task Monorepo

This is a monorepo containing two projects:
- **Server**: A NestJS application.
- **Client**: A ReactJS application.

## Prerequisites

Make sure you have the following tools installed on your machine:

- Node.js (version 18 or later)
- npm (version 7 or later)

## Getting Started

Follow the instructions below to set up the monorepo and run both the server and client applications.

### 1. Install Dependencies

To install all dependencies for both the `server` and `client` projects, run the following command from the root directory:

```bash
npm install
```

### 2. Start the Applications

To start both the **server** (NestJS) and **client** (ReactJS) applications concurrently, run:

```bash
npm run start
```

- This command uses `concurrently` to run both applications simultaneously:
  - The server runs on port `3001`.
  - The client runs on port `3000`.

To start the applications individually:

- **Start the Server**:

  ```bash
  npm run start:server
  ```

- **Start the Client**:

  ```bash
  npm run start:client
  ```

### 3. Clean Up

To clean up `node_modules` directories and build artifacts (`dist` and `build` directories) from the root, server, and client, use the following commands:

- **Clean All**:

  This will clean up `node_modules`, `dist`, and `build` directories from both the server, client, and root directories:

  ```bash
  npm run clean
  ```

- **Clean the Server Only**:

  ```bash
  npm run clean:server
  ```

- **Clean the Client Only**:

  ```bash
  npm run clean:client
  ```

- **Clean the Root `node_modules` Only**:

  ```bash
  npm run clean:root
  ```

### 4. Project Structure

The monorepo is structured as follows:

```
easy-generator-full-stack-task/
├── server/           # NestJS backend application
│   ├── dist/         # Compiled server files (generated)
│   ├── node_modules/ # Server dependencies (generated)
│   ├── src/          # Server source code
│   └── ...           # Other server files
├── client/           # ReactJS frontend application
│   ├── build/        # Compiled client files (generated)
│   ├── node_modules/ # Client dependencies (generated)
│   ├── public/       # Public assets
│   ├── src/          # Client source code
│   └── ...           # Other client files
├── package.json      # Root package file with shared scripts and dependencies
├── .dockerignore     # Docker ignore file
└── README.md         # This README file
```

### 5. Additional Notes

- The monorepo uses npm workspaces to manage dependencies and scripts for both the server and client projects.
- Make sure to run all commands from the root directory unless otherwise specified.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to reach out to the repository maintainer.



# Docker Setup

This project uses Docker and Docker Compose to manage both the client and server applications within a monorepo structure.

## Prerequisites

Make sure you have the following installed:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Folder Structure

The project consists of two main services:
- `client` (React Application)
- `server` (NestJS Application)

The Docker configuration is defined for both services, allowing them to run in isolated containers.

## Docker Compose Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DevNinja56/easy-generator-full-stack-task.git
   cd easy-generator-full-stack-task
   ```

2. **Build and run the containers**:
   Use Docker Compose to build and start both the server and client services.

   ```bash
   docker-compose build
   docker-compose up
   ```

   This will:
   - Build the server (`server/Dockerfile`) and expose it on port `3001`.
   - Build the client (`client/Dockerfile`) and expose it on port `3000`.

3. **Access the applications**:
   - React Client: [http://localhost:3000](http://localhost:3000)
   - NestJS Server: [http://localhost:3001](http://localhost:3001)

## Additional Docker Commands

- **Stop the containers**:
  ```bash
  docker-compose down
  ```

- **Rebuild the containers (useful when dependencies change)**:
  ```bash
  docker-compose build
  ```

- **View running containers**:
  ```bash
  docker ps
  ```

- **Tail container logs**:
  ```bash
  docker-compose logs -f
  ```

This setup simplifies the process of running the project in a development or production environment using Docker.

