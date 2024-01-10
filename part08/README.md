# Part 8

This part of the course is about GraphQL, Facebook's alternative to REST for communication between browser and server.

## Prerequisites

Before you begin, ensure you have the following software and resources:

- Node.js
- MongoDB (accessible online)
- Git (for cloning the repository)

### Installation

1. **Clone the Repository:**
   :
     ```
     git clone https://github.com/ViksyAsenov/fullstackopen
     ```

2. **Navigate to the project directories:**
   :
     ```
     cd part8/library-backend
     cd part8/library-frontend
     ```

3. **Install the required dependencies for each directory:**
   :
     ```
     npm install
     ```

4. **Create a `.env` file in the backend directory and define the following environment variables:**
   :
```
PORT=4000 # Port on which the server will run
MONGODB_URI=your-online-mongodb-connection-string
SECRET=your-secret-key-for-jwt
```

## Running the Application

To start the application, first run npm start in the backend directory, after that do the same for the frontend directory:
```
npm start
```

You can then access the GraphQL-playground on: http://localhost:PORT/. (the port from the backend `.env` file)
This is a very useful tool for a developer, and can be used to make queries to the server. The frontend can be accessed on http://localhost:3000/


