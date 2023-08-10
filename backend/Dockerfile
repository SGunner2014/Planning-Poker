FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app
ADD package.json /app/package.json
RUN yarn

ADD . /app

ENV NODE_ENV=development

EXPOSE 80

RUN ls -l

CMD ["yarn", "start:dev"]