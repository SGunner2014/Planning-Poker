FROM --platform=linux/amd64 node:16-alpine AS production

ENV PORT 3000

WORKDIR /app
COPY . .
RUN yarn

RUN yarn build

EXPOSE PORT

CMD ["yarn", "start"]



# FROM --platform=linux/amd64 node:16-alpine AS development

# ENV PORT 3000

# WORKDIR /app
# COPY . .
# RUN yarn

# EXPOSE PORT

# CMD ["yarn", "dev"]