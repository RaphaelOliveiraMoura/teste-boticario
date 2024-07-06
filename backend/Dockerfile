FROM node:18-alpine

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3001

CMD [ "npm", "start" ]
