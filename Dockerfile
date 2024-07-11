FROM node:18-alpine

RUN npm install -g npm@9.8.1
RUN npm i -g pnpm
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app
COPY ./pnpm-lock.yaml /usr/src/app
RUN pnpm i --frozen-lockfile

COPY . /usr/src/app
RUN pnpm run build