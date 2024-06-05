#-------------------------------------------------------------------------------
FROM node:20.12.2-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

#-------------------------------------------------------------------------------
FROM bitnami/nginx:1.22
COPY ./nginx.conf /opt/bitnami/nginx/conf/server_blocks/nginx.conf
COPY --from=builder /app/build /app
