FROM node:16 as test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN CI=true npm test

FROM node:16
COPY --from=test-stage /usr/src/app /usr/src/app

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm run build

RUN npm install -g serve

CMD PORT=3001 serve -s build
