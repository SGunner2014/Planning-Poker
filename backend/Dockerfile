FROM --platform=linux/amd64 node:16-alpine AS development

WORKDIR /app
ADD package.json /app/package.json
RUN yarn

ADD . /app

ENV NODE_ENV=development
ENV PORT=80

EXPOSE PORT

CMD ["yarn", "start:dev"]



FROM --platform=linux/amd64 node:16-alpine AS production

WORKDIR /app
ADD package.json /app/package.json
RUN yarn

ADD . /app

ENV NODE_ENV=production
ENV PORT=80

RUN npx @nestjs/cli build

EXPOSE PORT

CMD ["node", "dist/main"]