FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV DEBUG=express-server:* MONGO_URL=mongodb://host.docker.internal:27017/todosApp REDIS_URL=127.0.0.1:6379
CMD npm start