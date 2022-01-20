# Wine Maker's Assistant
The Wine Maker’s Assistant is freely available on GitHub, the following instructions assumes GIT is installed locally on the system.

The Wine Maker's Assistant is my senior project, representing the culmination of my college career. For its future implementation, I would recommend a rebuild utilizing a web framework such as Next.js or Remix. In its current state it is inefficient and insecure.

### 1.	Navigate to the directory you wish to install the Wine Maker’s Assistant and run the following command:
#### `git clone https://github.com/Ryxians/winemakersassistant-server.git`

### 2.	A new directory named ‘winemakersassistant-server’ will be generated, change to the directory.

### 3.	Once in the directory, run the following command:
#### `npm run getClient`

### 4.	A new directory named ‘winemakersassistant-client’ has been generated. Proceed to building and deploying instructions.

# Building and Deploying
### A deployable build of the Wine Maker’s Assistant can be built by running the following command within the ‘winemakersassistant-server’ directory:
#### `npm run buildServer`

### To get start the server, a .env file must first be instantiated. Create a .env file with the following options:
##### `DB_HOST=localhost`
##### `DB_USER=root`
##### `DB_PASS=root`
##### `DB_NAME=Schema`
##### `PORT=3001`

### 1.	The DB_HOST refers to where the database is running.

### 2.	 A username and password must be provided for the Wine Maker’s Assistant to connect with the database. 

### 3.	Finally, the DB_Name is the Schema name created in the Database requirement.

### 4.	PORT defines what port the server listens to. When starting the server, a crash may mean an unavailable port was defined.
Once the Wine Maker’s Assistant has been built and the .env file has been generated run the following command:
#### `npm run run`
