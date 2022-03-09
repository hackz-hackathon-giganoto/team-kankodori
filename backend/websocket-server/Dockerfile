FROM node:16.14.0
WORKDIR /usr/src/app

COPY . .

RUN npx pnpm install
CMD npx ts-node server.ts