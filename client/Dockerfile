FROM node:12-alpine as build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN echo "export const API_ADDR = 'https://api.shurly.app/api';" > config/constans.js

RUN yarn run build

CMD ["npm", "start"]
