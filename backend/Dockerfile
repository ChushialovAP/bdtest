FROM node:14-alpine AS builder
WORKDIR /app
COPY . /app/

RUN yarn
RUN yarn run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/build /app/
COPY package.json /app/package.json

RUN yarn
EXPOSE 3001
CMD ["yarn", "run", "start"]