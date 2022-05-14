FROM node:current-alpine
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir /app && cp -a /tmp/node_modules /app/
COPY . /app
WORKDIR /app
USER node
CMD ["node", "--experimental-json-modules", "index.mjs"]
