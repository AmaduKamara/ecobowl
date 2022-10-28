FROM node:alpine

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . /usr/src

RUN yarn install

RUN yarn build

ENV PORT=8080

EXPOSE 8080

CMD ["yarn", "start"]