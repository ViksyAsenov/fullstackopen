FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV PORT=3001 REACT_APP_BACKEND_URL=http://localhost:3000

CMD npm start
