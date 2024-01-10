# Part 6

So far, we have placed the application's state and state logic directly inside React components. When applications grow larger, state management should be moved outside React components. In this part, we will introduce the Redux library, which is currently the most popular solution for managing the state of React applications.

## Requirements
* [node](https://nodejs.org/en/download/)


## Start the application

There is one application by folder, to start an application :

```bash
# Head to the desired exercise (anecdotes-query, anecdotes-redux or unicafe-redux)
cd anecdotes-query

# Download packages
npm install

# Start the backend JSON server if needed
$ npx json-server --port 3001 --watch db.json

# Start the application
npm start
```

You can then access the frontend on : [http://localhost:3000/](http://localhost:3000/)

