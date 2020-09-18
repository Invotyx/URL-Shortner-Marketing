FROM node:12-alpine as build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN echo "export const API_ADDR = 'https://api.shurly.app/api';" > config/constans.js
RUN echo "export const APP_NAME = 'Shurly';" >> config/constans.js
RUN echo "export const ADDR = 'https://shurly.app/';" >> config/constans.js
RUN echo "export const REDIRECT_TIME = 5000;" >> config/constans.js
RUN echo "export const REDIRECT = false;" >> config/constans.js

RUN yarn run build

EXPOSE 3000

CMD ["npm", "start"]
