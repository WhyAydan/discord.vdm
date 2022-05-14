FROM node:16.15.0-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
USER node
CMD ["node", "--experimental-json-modules", "index.mjs"]
