FROM node:16.15.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

USER node

CMD ["node", "--experimental-json-modules", "index.mjs"]
