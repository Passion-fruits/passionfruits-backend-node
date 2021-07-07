FROM node:14-alpine

WORKDIR /home/node/app

COPY . .

RUN npm install

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "start" ]