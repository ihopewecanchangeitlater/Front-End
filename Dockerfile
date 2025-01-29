ARG NODE_VERSION=23.5.0

# Base image
FROM node:alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

ARG REACT_APP_API_BASE_URL

ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

RUN npm run build

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3000

CMD serve -s build
