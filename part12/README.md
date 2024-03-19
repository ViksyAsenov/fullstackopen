# Part 12

In this part, we will learn how to package code into standard units of software called containers. These containers can help us develop software faster and easier than before. Along the way, we will also explore a completely new viewpoint for web development outside of the now-familiar Node.js backend and React frontend.

We will utilize containers to create immutable execution environments for our Node.js and React projects. Containers also make it easy to include multiple services with our projects. With the flexibility, we will explore and experiment with many different and popular tools by utilizing containers.

## Prerequisites

Before you begin, ensure you have the following software and resources:

- Docker
- Docker Compose
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
     cd part12/my-app
     cd part12/todo-app
     ```

3. **Create and run the images with docker compose in development or production mode (docker-compose.dev.yaml or docker-compose.yaml)**
   :
     ```
     docker compose -f docker-compose.dev.yaml/docker-compose.yaml up -d
     ```


## The applications

Each of them run on http://localhost:8080 via nginx so make sure to not start both at the same itme. My-App is a simple guess the number game and Todo-App is basically what the name suggests.


