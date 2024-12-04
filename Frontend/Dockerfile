FROM node:22.12-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 5050

CMD ["serve", "-s", "dist", "-l", "5050"]