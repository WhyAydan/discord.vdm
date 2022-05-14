# Build
FROM node:16.15.0-slim AS build

COPY package*.json ./
RUN npm install

COPY . .

# Run
FROM node:16.15.0-slim

ENV DB_PATH=/database
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

USER node

CMD ["node", "--experimental-json-modules", "./index.mjs"]
