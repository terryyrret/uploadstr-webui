FROM node:alpine AS build

WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build
RUN rm -rf src/ static/

USER node:node

CMD ["node", "build/index.js"]
