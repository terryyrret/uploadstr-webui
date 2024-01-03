FROM node:alpine AS build

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/public /usr/share/nginx/html
