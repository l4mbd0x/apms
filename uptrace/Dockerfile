FROM node:10.16.3-alpine

WORKDIR /app
ARG  NPM_TOKEN
COPY .npmrc .npmrc
COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

CMD ["node", "server.js"]
