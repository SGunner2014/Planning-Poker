FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app
ADD package.json /app/package.json
RUN yarn

ADD . /app


ENV NODE_ENV=development

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]