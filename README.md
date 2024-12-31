# Wine Maker's Assistant

The Wine Maker’s Assistant is a senior project that demonstrates key learnings and skills. It is freely available on GitHub. The following instructions assume GIT is installed locally on your system.

## Table of Contents
1. [Overview](#overview)
2. [To-Do](#to-do)
3. [Installation](#installation)
4. [Building and Deploying](#building-and-deploying)
5. [Environment Configuration](#environment-configuration)
6. [Docker Setup](#docker-setup)

## Overview
The Wine Maker’s Assistant is a tool designed to assist winemakers in managing their processes efficiently. The project now exists as a unified repository, with the client code under `/client` and the server code under `/server`.

## To-Do
### Planned Updates
- Upgrade from **Node.js 16** to **Node.js 22**.
- Upgrade from **MySQL 5.7** to **MySQL 8.3**.
- Add Dockerfile for `/server`.
- Add Dockerfile for `/client`.
- Replace **TypeORM** with **DrizzleORM**.
- Upgrade from **TypeScript 4.3.4** to **TypeScript 5.x**.
- Replace Create React App with Vite

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ryxians/winemakersassistant.git
   ```

2. Navigate to the project directory:
   ```bash
   cd winemakersassistant
   ```

3. Install dependencies for both server and client:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

## Building and Deploying

### Building the Server
1. Build the server code:
   ```bash
   cd server
   npm run build
   ```

2. Ensure the `.env` file is properly configured (see [Environment Configuration](#environment-configuration)).

### Building the Client
1. Build the client code:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the built client as per your hosting solution.

### Running the Server
1. Start the server:
   ```bash
   cd server
   npm start
   ```

## Environment Configuration

Create a `.env` file in the `/server` directory with the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=Schema
PORT=3001
```

- **DB_HOST:** Specifies the database host.
- **DB_USER:** Username for database authentication.
- **DB_PASS:** Password for database authentication.
- **DB_NAME:** Name of the database schema.
- **PORT:** Port on which the server will listen. Ensure the port is not in use to prevent conflicts.

## Docker Setup

A `docker-compose` file has been provided to quickly set up a MySQL 5.7 database for development.

### Steps
1. Ensure Docker and Docker Compose are installed on your system.
2. Start the database:
   ```bash
   docker-compose up -d
   ```

3. The database will now be accessible on `localhost:3306` with the credentials specified in the `environment` section of the `compose.yaml` file.

