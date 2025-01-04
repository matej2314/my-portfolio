FROM node:22.12-slim

WORKDIR /app

COPY package*.json  .

COPY . .

# RUN rm -rf node_modules && npm install 

EXPOSE 5051

CMD [ "node", "server.js" ] 

