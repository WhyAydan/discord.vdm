FROM node:current-alpine
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir /app && cp -a /tmp/node_modules /app/
COPY . /app
WORKDIR /app
RUN chown -R 1000:1000 database
USER node
CMD ["node", "--experimental-json-modules", "index.mjs"]
