# Bloglist

The Blog List application allows users to save and manage information about interesting blogs they discover on the internet. For each blog, users can store the author, title, URL, and the number of upvotes.

## Getting Started

These instructions will help you get the project up and running on your local machine for development and testing purposes.

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

2. **Navigate to the project directory:**
   :
     ```
     cd part4/bloglist
     ```

3. **Install the required dependencies:**
   :
     ```
     npm install
     ```

4. **Create a `.env` file in the root directory and define the following environment variables:**
   :
```
PORT=3001 # Port on which the server will run
MONGODB_URI=your-online-mongodb-connection-string
SECRET=your-secret-key-for-jwt
```

## Running the Application

To start the application, run the following command:
```
npm start
```
The server will start on the port defined in your .env file.

## Features

Once the application is running, you can perform the following operations:

- Create and list users (POST, GET).
- Login using a username and password (POST).
- Create, list, update, and delete blogs (POST, GET, PUT, DELETE) for authenticated users.

## API Endpoints

The Blog List application offers a set of API endpoints to interact with users and blogs. These endpoints allow users to create and manage accounts, as well as create, update, and delete blogs.

### User Management

- **Create a New User (POST)**: `/api/users`
  - Register a new user by providing a username, name, and password.

- **User Login (POST)**: `/api/login`
  - Log in using a username and password. A JSON Web Token (JWT) is returned upon successful login.

### Blog Management

- **Create a New Blog (POST)**: `/api/blogs`
  - Create a new blog by providing the title, author, URL, and the number of likes. Requires a valid JWT token for authorization.

- **List All Blogs (GET)**: `/api/blogs`
  - Retrieve a list of all blogs, including their details.

- **Update an Existing Blog (PUT)**: `/api/blogs/ID`
  - Update the information of an existing blog, such as the title, author, URL, or likes. Requires a valid JWT token for authorization.

- **Delete a Blog (DELETE)**: `/api/blogs/ID`
  - Delete a blog by its unique identifier. Requires a valid JWT token for authorization.

