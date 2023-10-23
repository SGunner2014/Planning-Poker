FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app/frontend
COPY . .
RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]
